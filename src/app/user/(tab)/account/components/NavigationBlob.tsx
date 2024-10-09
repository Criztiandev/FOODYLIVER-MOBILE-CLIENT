import YStack from "@/components/stacks/YStack";
import { Wallet } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { IOrderNavigationDataset } from "../../../../../data/account.data";
import { useRouter } from "expo-router";

const NavigationBlob = ({ title, path, icon }: IOrderNavigationDataset) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="  p-2 mr-2 rounded-md border-primary border"
      onPress={() => router.push(path)}
    >
      <YStack className="items-center space-y-1">
        {icon}
        <Text>{title}</Text>
      </YStack>
    </TouchableOpacity>
  );
};

export default NavigationBlob;
