import {
  LoginValidation,
  RegistrationValidation,
} from "@/service/validation/auth.validation";
import { z } from "zod";
import { User } from "./user.interface";

export type LoginValue = z.infer<typeof LoginValidation>;
export type RegisterValue = z.infer<typeof RegistrationValidation>;

export interface AuthStore {
  login: (email: string, password: string) => void;
  register: (credentials: User) => void;
  forgotPassword: () => void;
}
