import { User } from "../models";
import { Context } from "hono";
import { decode, verify } from "hono/jwt";
import { setSignedCookie, getSignedCookie, deleteCookie } from "hono/cookie";
import { generateAccessToken } from "./../lib";
import { defaults } from "../config/defaults";
import {
  badRequestHandler,
  authenticationError,
  authorizationError,
  serverErrorHandler,
} from "../middlewares";
import axios from "axios";
import {
  changeAvatarService,
  changePasswordService,
  deleteUserService,
  forgotPasswordService,
  getSingleUserService,
  getUsersService,
  loginService,
  reGenerateS3AccessKey,
  registerUserService,
  resetPasswordService,
  updateProfileService,
  updateUserService,
  getUserCountService,
} from "../services";

const JWT_REFRESH_SECRET =
  (process.env.JWT_REFRESH_SECRET as string) || "refresh";
const DOMAIN_NAME = process.env.DOMAIN_NAME as string;

// 🔹 Get all users
const getUsers = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || defaults.page;
  const limit = parseInt(c.req.query("limit") as string, 10) || defaults.limit;
  const search = c.req.query("search") || defaults.search;
  const sortBy = c.req.query("sortBy") || defaults.sortBy;
  const sortType = c.req.query("sortType") || defaults.sortType;
  const role = c.req.query("role") || "";
  const active = c.req.query("active");

  const activity = active === "false" ? false : active === "true" ? true : "";

  const response = await getUsersService({
    page,
    limit,
    search,
    sortBy,
    sortType,
    role,
    active: activity,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// 🔹 Count how many users I have.
const getUserCount = async (c: Context) => {
  const response = await getUserCountService();

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// 🔹 Get Me
const getMe = async (c: Context) => {
  try {
    // Get user from auth token
    const me = c.get("user");

    // Check if user is authenticated
    if (!me) {
      return authenticationError(c);
    }

    // Check if avatar is exist
    const avatarUrl = me?.avatar;

    if (avatarUrl) {
      try {
        // Check if signed URL is valid
        await axios.get(avatarUrl, {
          headers: { Range: "bytes=0-0" },
        });
      } catch (error: any) {
        if (
          error.response &&
          (error.response.status === 403 || error.response.status === 404)
        ) {
          // Generate new signed avatarURL and save
          me.avatar = await reGenerateS3AccessKey(avatarUrl);
          await me.save();
        } else {
          console.error("Error checking signed URL:", error.message);
          throw error;
        }
      }
    }

    // Response
    return c.json(
      {
        success: true,
        message: "User fetched successfully",
        data: me,
      },
      200
    );
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
      500
    );
  }
};

// 🔹 Get Single User
const getSingleUser = async (c: Context) => {
  const id = c.req.param("id");

  const response = await getSingleUserService(id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// 🔹 Update User
const updateUser = async (c: Context) => {
  const id = c.req.param("id");

  const body = await c.req.json();

  const user = c.get("user");
  const isSelfUpdate = user._id.toString() === id.toString();

  if (isSelfUpdate && user.role === "super_admin") {
    if (body.role && body.role !== "super_admin") {
      body.role = "super_admin";
    }
  }

  const response = await updateUserService({ id, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Update profile
const updateProfile = async (c: Context) => {
  // Get user from auth token
  const user = c.get("user");

  if (!user) {
    return authenticationError(c);
  }

  const body = await c.req.json();

  const response = await updateProfileService({ user, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// 🔹 Register User
const registerUser = async (c: Context) => {
  const body = await c.req.json();

  const response = await registerUserService(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

// 🔹 Login User
const loginUser = async (c: Context) => {
  const body = await c.req.json();

  const response = await loginService(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  // Refresh token setting on the cookie
  await setSignedCookie(
    c,
    "refreshToken",
    response.success.tokens.refreshToken,
    JWT_REFRESH_SECRET,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      domain: process.env.NODE_ENV === "production" ? DOMAIN_NAME : undefined,
      maxAge: 604800,
    }
  );

  return c.json(response.success, 200);
};

// 🔹 Refresh Token
const refreshToken = async (c: Context) => {
  try {
    // Get refresh token from cookie
    const rToken = await getSignedCookie(c, JWT_REFRESH_SECRET, "refreshToken");

    if (!rToken) {
      return authenticationError(c);
    }

    // Verify refresh token
    const token = await verify(rToken, JWT_REFRESH_SECRET);

    if (!token) {
      return authenticationError(c);
    }

    // Check if refresh token is valid
    const user = await User.findOne({ refreshTokens: { $in: [rToken] } });

    if (!user) {
      return authorizationError(c, "Forbidden");
    }

    // Generate new access token
    const accessToken = await generateAccessToken({ user });

    // Response
    return c.json(
      {
        success: true,
        message: "Token refreshed",
        tokens: {
          accessToken,
        },
      },
      200
    );
  } catch (error: any) {
    if (error.name === "JwtTokenExpired") {
      return authorizationError(
        c,
        "Refresh token expired. Please login again."
      );
    }

    return c.json(
      {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
      500
    );
  }
};

// 🔹 Logout User
const logout = async (c: Context) => {
  try {
    // Clear cookie using Hono's deleteCookie
    const refreshToken = deleteCookie(c, "refreshToken", {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      domain: process.env.NODE_ENV === "production" ? DOMAIN_NAME : undefined,
    });

    if (!refreshToken) {
      return authenticationError(c);
    }

    const { payload } = decode(refreshToken as string) as any;

    if (!payload) {
      return authenticationError(c, "Invalid refresh token on the cookie");
    }

    const token = refreshToken.split(".").splice(0, 3).join(".");

    // Remove refresh token from database
    const result = await User.updateOne(
      { _id: payload.id },
      {
        $pull: {
          refreshTokens: token,
        },
      }
    );

    if (result.matchedCount === 0 || result.modifiedCount === 0) {
      return authenticationError(c); // 401 Unauthorized
    }

    if (result.matchedCount === 0) {
      console.warn("User not found during refresh token removal");
    }

    if (result.modifiedCount === 0) {
      console.warn("Refresh token not found in user's token list");
    }

    // Response
    return c.json(
      {
        success: true,
        message: "Logout successful",
      },
      200
    );
  } catch (error: any) {
    console.log("Error :", error);
    return c.json(
      {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
      500
    );
  }
};

// Change Password
const changePassword = async (c: Context) => {
  const body = await c.req.json();

  // Check if user exists. and get email from token
  const { email } = c.get("user");

  const user = await User.findOne({ email });

  if (!user) {
    return authenticationError(c);
  }

  const response = await changePasswordService({ user, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// 🔹 Delete User
const deleteUser = async (c: Context) => {
  const id = c.req.param("id");

  const response = await deleteUserService(id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// 🔹 Forgot Password
const forgotPassword = async (c: Context) => {
  const { email } = await c.req.json();

  const response = await forgotPasswordService(email);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// 🔹 Reset Password
const resetPassword = async (c: Context) => {
  // Token come from param
  const resetToken = c.req.param("resetToken");

  // Password come from body
  const { password } = await c.req.json();

  const response = await resetPasswordService({ password, resetToken });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// 🔹 Change Avatar
const changeAvatar = async (c: Context) => {
  const body = await c.req.parseBody();
  const file = body["avatar"] as File;

  // Get user from auth token
  const user = c.get("user");
  if (!user) {
    return authenticationError(c);
  }

  // Generate filename
  const fileN = c.req.query("filename") || "avatar";
  const filename = `${fileN}-${Date.now()}.jpeg`;

  const response = await changeAvatarService({
    body: { avatar: file },
    filename,
    user,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export {
  getUsers,
  getMe,
  updateProfile,
  getSingleUser,
  updateUser,
  registerUser,
  loginUser,
  changePassword,
  deleteUser,
  forgotPassword,
  resetPassword,
  changeAvatar,
  getUserCount,
  refreshToken,
  logout,
};
