import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, usePathname } from "next/navigation";
import { resetPasswordFormSchema } from "@/lib/validations/";
import { handleAxiosError } from "@/utils/error";
import { useState } from "react";
import api from "@/protectedApi/Interceptor";

const useReset = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const key = usePathname().split("/").pop() as string;

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordFormSchema>) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/users/auth/reset-password/${key}`, {
        password: data.newPassword,
      });

      if (!response.data.success) {
        throw new Error(response.data?.error?.message || "Reset failed");
      }

      setIsSuccess(true);

      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 5000);

      console.log(response.data.message);
    } catch (error: any) {
      handleAxiosError(error);

      const res = error.response.data;

      form.setError("newPassword", {
        message: res.error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    isSuccess,
  };
};

export default useReset;
