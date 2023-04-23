import { z } from "zod";

export const PasswordVerification = z
  .object({
    Password: z.string().min(8),
    RepeatPassword: z.string().min(8),
  })
  .refine(({ Password, RepeatPassword }) => {
    if (Password === RepeatPassword) {
      return {
        message: "Password and confirm Password must be the same",
      };
    }
  });
