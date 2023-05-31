import { z } from "zod";

export const PasswordVerification = z
  .object({
    Password: z.string().min(8).nonempty(),
    RepeatPassword: z.string().min(8).nonempty(),
  })
  .refine(({ Password, RepeatPassword }) => {
    if (Password === RepeatPassword) {
      return {
        message: "Password and confirm password must be the same",
      };
    }
  });
