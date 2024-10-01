import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const NotificationButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/account/notification")}
      className="mr-3"
    >
      <Bell color="black" />
    </TouchableOpacity>
  );
};

export default NotificationButton;
