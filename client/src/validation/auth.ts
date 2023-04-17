import { z } from "zod";

export const UserSchemaRegister = z
  .object({
    email: z.string().email().nonempty().trim(),
    password: z.string().min(8).optional(),
    RepeatPassword: z.string().min(8).optional(),
  })
  .refine(({ password, RepeatPassword }) => {
    if (password !== RepeatPassword) {
      return {
        message: "Password and confirm password must be the same",
      };
    }
  });

export const UserSchemaLogin = z.object({
  email: z.string().email().nonempty().trim(),
  password: z.string().min(8).optional(),
});
