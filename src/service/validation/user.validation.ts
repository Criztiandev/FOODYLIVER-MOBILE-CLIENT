import { z } from "zod";

const userValidation = z.object({
  username: z
    .string()
    .min(3, "Username is too short")
    .max(255, "Username is too long"),
  first_name: z
    .string()
    .min(3, "First name is too short")
    .max(255, "First name is too long"),
  last_name: z
    .string()
    .min(3, "Last name is too short")
    .max(255, "Last name is too long"),

  address: z.any(),

  city: z.string().min(3, "City is too short").max(255, "City is too long"),
  postal_code: z
    .string()
    .min(3, "Postal Code is too short")
    .max(255, "Postal Code is too long"),

  // Fullname
  name: z.string().min(1, "Name is too short").max(255, "Name is too long"),
  email: z
    .string()
    .email("Invalid email")
    .min(5, "Email is too short")
    .max(100, "Email is too long"),

  phone_number: z
    .string()
    .min(5, "Phone number is too short")
    .max(100, "Phone number is too long"),

  password: z
    .string()
    .min(5, "Password is too short")
    .max(16, "Password is too long"),
});

export default userValidation;
