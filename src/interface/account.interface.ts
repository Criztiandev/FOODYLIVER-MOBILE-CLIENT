import { User } from "./user.interface";

export interface AccountStore {
  credentials: User | null;

  logout: () => void;
  getCredentials: () => Promise<User | unknown>;
  setCredentials: (credentials: User) => void;
  updateCredentials: (credentials: User) => void;
}
