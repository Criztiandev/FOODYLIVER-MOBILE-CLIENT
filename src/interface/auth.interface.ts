import {
  LoginValidation,
  RegistrationValidation,
} from "@/service/validation/auth.validation";
import { z } from "zod";

export type LoginValue = z.infer<typeof LoginValidation>;
export type RegisterValue = z.infer<typeof RegistrationValidation>;
