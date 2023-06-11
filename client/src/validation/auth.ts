import { z } from "zod";

export const UserSchemaRegister = z
  .object({
    email: z.string().email().nonempty().trim(),
    password: z.string().min(8).nonempty(),
    RepeatPassword: z.string().min(8).nonempty(),
    name: z.string().default(`user${Math.floor(Math.random() * 10000)}`),
  })
  .refine(({ password, RepeatPassword }) => {
    if (password === RepeatPassword) {
      return {
        message: "Password and confirm password must be the same",
      };
    }
  });

export const UserSchemaLogin = z.object({
  email: z.string().email().nonempty().trim(),
  password: z.string().min(8).nonempty(),
});

export const UserProfile = z
  .object({
    name: z.string().max(10).min(3).trim().optional(),
    email: z.string().email().trim().optional(),
    oldPassword: z.string().min(8).optional(),
    newPassword: z.string().min(8).optional(),
  })
  .refine(({ oldPassword, newPassword }) => {
    if (oldPassword === newPassword) {
      return {
        message: "Password and confirm password must be the same",
      };
    }
  });
