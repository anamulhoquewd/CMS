import { loginFormSchema } from "@/lib/validations/";
import api from "@/protectedApi/Interceptor";
import { setStorage } from "@/store/local";
import { handleAxiosError } from "@/utils/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/dashboard";
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    // Start loading
    setIsLoading(true);

    try {
      // Send login request
      const response = await api.post(`/users/auth/login`, {
        ...(data.email.includes("@")
          ? { email: data.email }
          : { phone: data.email }),
        password: data.password,
      });

      console.log("response");

      // if response is successful

      if (!response.data.success) {
        throw new Error(response.data?.error?.message || "Login failed");
      }
      // Set access token
      const accessToken = response.data.tokens.accessToken;

      // Set access token in local storage
      setStorage("accessToken", accessToken);

      // Clear form
      form.reset({
        email: "",
        password: "",
      });

      // Redirect to home page
      router.push(redirectTo);
    } catch (error: any) {
      // Handle error
      handleAxiosError(error);

      // Set form errors
      if (error.response && error.response.data) {
        const res = error.response.data;

        if (res.fields) {
          // Set form errors
          res.fields.forEach((field: { name: string; message: string }) => {
            form.setError(field.name as "email" | "password", {
              message: field.message,
            });
          });
        }
      }
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
};

export default useLogin;
