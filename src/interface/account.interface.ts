import { UseMutationResult } from "@tanstack/react-query";
import { User } from "./user.interface";

export interface AccountStore {
  credentials: User | null;

  logout: () => void;
  getCredentials: () => void;
  setCredentials: (credentials: User) => void;
  updateCredentials: (credentials: User) => void;
  deleteAccount: () => UseMutationResult<any, Error>;
}
