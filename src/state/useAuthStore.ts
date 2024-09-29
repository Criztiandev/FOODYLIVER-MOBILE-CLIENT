import { AuthStore } from "@/interface/auth.interface";
import { User } from "@/interface/user.interface";
import { create } from "zustand";

const useAuthStore = create<AuthStore>((set) => ({
  login: (email: string, password: string) => {
    return;
  },

  register: (credentials: User) => {
    return;
  },

  forgotPassword: () => {
    return;
  },
}));

export default useAuthStore;
