import YStack from "@/components/stacks/YStack";
import { Wallet } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { IAccontNavigationDataSet } from "../../../../../data/account.data";
import { useRouter } from "expo-router";

const NavigationBlob = ({ title, path, icon }: IAccontNavigationDataSet) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="border  p-2 mr-2 rounded-md"
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
