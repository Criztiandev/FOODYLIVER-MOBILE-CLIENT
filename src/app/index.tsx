import React, { useEffect, useState } from "react";
import { Redirect, useRootNavigationState, useRouter } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

const privateRoutes = {
  user: "/user/home",
};

const RootLayout = () => {
  const [currentRoute, setCurrentRoute] = useState("");
  const { user } = useAuth();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (user === null || !user.role?.includes("user")) {
      setCurrentRoute("/auth/sign-in");
    } else {
      setCurrentRoute(`/${user.role}/home`);
    }
  }, [user]);

  if (!rootNavigationState.key) {
    return null;
  }

  return <Redirect href={currentRoute || "/auth/sign-in"} />;
};

export default RootLayout;
