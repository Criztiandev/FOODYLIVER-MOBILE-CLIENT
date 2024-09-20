import { User } from "@/interface/user.interface";
import { useRootNavigationState, useRouter } from "expo-router";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps extends PropsWithChildren {}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user] = useState<User | null>({
    firstName: "Criztian",
    lastName: "Tuplano",
    role: "user",
  });
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/user/home");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
