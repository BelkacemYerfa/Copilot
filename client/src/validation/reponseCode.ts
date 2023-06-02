import { z } from "zod";

export const PasswordVerification = z
  .object({
    password: z.string().min(8).nonempty(),
    RepeatPassword: z.string().min(8).nonempty(),
  })
  .refine(({ password, RepeatPassword }) => {
    if (password === RepeatPassword) {
      return {
        message: "Password and confirm password must be the same",
      };
    }
  });
