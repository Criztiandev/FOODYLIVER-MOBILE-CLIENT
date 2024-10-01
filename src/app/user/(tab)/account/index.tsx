import React from "react";
import BaseLayout from "@/layout/BaseLayout";
import { ChevronRight, UserCircle, Wallet } from "lucide-react-native";
import TabBar from "@/layout/headers/TabBar";
import { Stack, useRouter } from "expo-router";
import XStack from "@/components/stacks/XStack";
import NotificationButton from "@/components/atoms/button/NotificationButton";
import CartButton from "@/components/atoms/button/CartButton";
import Avatar from "@/components/ui/Avatar";
import YStack from "@/components/stacks/YStack";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Button from "@/components/ui/Button";
import NavigationBlob from "./components/NavigationBlob";
import { AccountInfoStepValidation } from "@/service/validation/auth.validation";
import { AccountNavigationDataSet } from "../../../../data/account.data";

const RootScreen = () => {
  const router = useRouter();
  return (
    <BaseLayout>
      <Stack.Screen
        options={{
          title: "",
          headerRight: () => (
            <XStack className="space-x-4 px-4">
              <NotificationButton />
              <CartButton />
            </XStack>
          ),
        }}
      />
      <YStack className="px-2 py-4 space-y-4">
        <XStack className="items-center space-x-4">
          <Avatar size={64} />

          <YStack className="items-center">
            <Text className="text-xl font-bold ">Yen Timmango </Text>
            <Text className="text-md font-semibold  text-gray-500 ">
              Customer
            </Text>
          </YStack>
        </XStack>

        <YStack>
          <XStack className="items-center justify-between mb-4 ">
            <Text className="text-xl font-bold">My Order</Text>
          </XStack>

          <FlashList
            data={AccountNavigationDataSet}
            estimatedItemSize={500}
            horizontal
            renderItem={({ item }) => <NavigationBlob {...item} />}
          />
        </YStack>

        <YStack className="space-y-2">
          <Button
            className="bg-[#D9D9D9] flex-row justify-between items-center"
            onPress={() => router.push(`/account/details/${123123}`)}
          >
            <Text className=" text-base font-semibold">
              Account and Security
            </Text>

            <ChevronRight color="black" />
          </Button>

          <Button
            className="bg-[#D9D9D9] flex-row justify-between items-center"
            onPress={() => router.push(`/account/address/${123123123}`)}
          >
            <Text className=" text-base font-semibold">My Address</Text>
            <ChevronRight color="black" />
          </Button>

          <Button className="bg-[#D9D9D9] flex-row justify-between items-center">
            <Text className=" text-base font-semibold">Link Gcash Account</Text>
          </Button>

          <Button className=" flex-row justify-between items-center">
            <Text className="text-white text-base font-semibold">Logout</Text>
          </Button>
        </YStack>
      </YStack>
    </BaseLayout>
  );
};

export default RootScreen;
