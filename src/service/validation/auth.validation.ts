import { z } from "zod";
import userValidation from "./user.validation";

export const LoginValidation = userValidation.pick({
  email: true,
  password: true,
});

export const RegistrationValidation = userValidation.extend({
  confirmPassword: z.string(),
});

export const PersonalInfoStepValidation = userValidation.pick({
  firstName: true,
  lastName: true,
});

export const AccountInfoStepValidation = userValidation.pick({
  email: true,
  password: true,
});
