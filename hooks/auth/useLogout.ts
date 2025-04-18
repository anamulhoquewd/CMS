import api from "@/protectedApi/Interceptor";
import { removeStorage } from "@/store/local";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

function useLogout() {
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      const response = await api.post("/users/auth/logout", null);

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      // Redirect to sign in page
      router.push("/auth/sign-in");
    } catch (error: any) {
      console.warn("Error while logging out", error);
    }
  }, []);

  return { logout };
}

export default useLogout;
