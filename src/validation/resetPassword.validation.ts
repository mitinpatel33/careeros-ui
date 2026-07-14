import { z } from "zod";

export const resetPasswordSchema =
  z
    .object({
      password: z
        .string()
        .min(
          8,
          "Minimum 8 characters"
        ),

      confirmPassword:
        z.string(),
    })
    .refine(
      (data) =>
        data.password ===
        data.confirmPassword,
      {
        path: [
          "confirmPassword",
        ],
        message:
          "Passwords do not match",
      }
    );

export type ResetPasswordSchemaType =
  z.infer<
    typeof resetPasswordSchema
  >;