import { View, Text } from "react-native";
import React, { useEffect } from "react";
import useAccountStore from "@/state/useAccountStore";
import useLocalStorage from "@/hooks/utils/useLocalStorage";
import { useRouter } from "expo-router";

const RootScreen = () => {
  const { getItem, setItem } = useLocalStorage();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const credentials = await getItem("user");

      if (credentials) {
        setItem("user", credentials);
        router.navigate("/user/home");
      } else {
        router.navigate("/auth/sign-in");
      }
    })();
  }, []);

  return (
    <View>
      <Text>Not Found a shit</Text>
    </View>
  );
};

export default RootScreen;
