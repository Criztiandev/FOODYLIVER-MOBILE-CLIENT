import { useAuth } from "@/providers/AuthProvider";
import { Redirect, useRootNavigationState } from "expo-router";
import React, { FC, PropsWithChildren } from "react";
import Toast from "react-native-toast-message";

interface Props extends PropsWithChildren {
  allowedRoles: string[];
}

const ProtectedRoute: FC<Props> = ({ allowedRoles, children }) => {
  const { user: currentUser } = useAuth();
  const rootState = useRootNavigationState();

  if (!rootState.key) return null;

  if (
    currentUser === null ||
    !allowedRoles.includes(currentUser?.role as unknown as string)
  ) {
    return <Redirect href="/auth/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
