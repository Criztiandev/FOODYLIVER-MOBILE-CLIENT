import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const FavoriteButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("")}>
      <Bell color="black" />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
