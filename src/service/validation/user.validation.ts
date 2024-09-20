import { z } from "zod";

const userValidation = z.object({
  firstName: z
    .string()
    .min(3, "First name is too short")
    .max(255, "First name is too long"),
  middleName: z
    .string()
    .min(3, "Middle name is too short")
    .max(255, "Middle name is too long")
    .optional(),
  lastName: z
    .string()
    .min(3, "Last name is too short")
    .max(255, "Last name is too long"),
  suffix: z
    .string()
    .min(1, "Suffix is too short")
    .max(255, "Suffix is too long"),
  email: z
    .string()
    .email("Invalid email")
    .min(5, "Email is too short")
    .max(100, "Email is too long"),
  password: z
    .string()
    .min(8, "Password is too short")
    .max(16, "Password is too long"),
});

export default userValidation;
