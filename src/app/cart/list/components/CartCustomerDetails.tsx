import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import { Phone, Pin, User } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";

const CartCustomerDetails = () => {
  return (
    <YStack className="space-y-2">
      <XStack>
        <User color="black" />
        <Text className="text-lg">Yen Timmango</Text>
      </XStack>

      <XStack>
        <Pin color="black" />
        <Text className="text-lg">Tabuk Kalinga,Philippines, 3800</Text>
      </XStack>

      <XStack>
        <Phone color="black" />
        <Text className="text-lg">1234567890</Text>
      </XStack>
    </YStack>
  );
};

export default CartCustomerDetails;
