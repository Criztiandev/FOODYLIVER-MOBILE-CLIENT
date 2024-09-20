import userValidation from "@/service/validation/user.validation";
import { z } from "zod";

export type User = z.infer<typeof userValidation> & {
  role?: string;
};
