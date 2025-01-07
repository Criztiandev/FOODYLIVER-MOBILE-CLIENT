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
  first_name: true,
  username: true,
  last_name: true,
});

export const CurrentLocationStepValidation = userValidation.pick({
  address: true,
});

export const AddressInfoValidation = userValidation
  .pick({
    address: true,
    postal_code: true,
  })
  .extend({
    blk: z.string().min(0, "Too short").max(32, "Too long").optional(),
    lot: z.string().min(0, "Too short").max(32, "Too long").optional(),
    building: z.string().min(0, "Too short").max(32, "Too long").optional(),
  });

export const AccountInfoStepValidation = userValidation.pick({
  email: true,
  password: true,
  phone_number: true,
});
