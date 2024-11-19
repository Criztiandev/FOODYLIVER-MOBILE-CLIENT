import React from "react";
import BaseLayout from "@/layout/BaseLayout";
import { ChevronRight } from "lucide-react-native";
import { Stack, useRouter } from "expo-router";
import XStack from "@/components/stacks/XStack";
import NotificationButton from "@/components/atoms/button/NotificationButton";
import CartButton from "@/components/atoms/button/CartButton";
import Avatar from "@/components/ui/Avatar";
import YStack from "@/components/stacks/YStack";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Button from "@/components/ui/Button";
import NavigationBlob from "./components/NavigationBlob";
import {
  AccountNavivationDataset,
  OrderNavigationDataset,
} from "@/data/account.data";
import useLogout from "@/hooks/account/useLogout";

const RootScreen = () => {
  const { mutate, isPending } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    mutate("");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShown: false,
          headerRight: () => (
            <XStack className="space-x-4 px-4">
              <NotificationButton />
              <CartButton />
            </XStack>
          ),
        }}
      />
      <BaseLayout>
        <YStack className="py-4 space-y-4 ">
          <XStack className="items-center space-x-4 px-2 py-8 pb-4 bg-primary ">
            <Avatar
              size={64}
              source={require("@/assets/images/girl-user.png")}
            />

            <YStack className="items-start">
              <Text className="text-xl font-bold text-white ">
                Yen Timmango{" "}
              </Text>
              <Text className="text-md font-semibold  text-white/50 ">
                Customer
              </Text>
            </YStack>
          </XStack>

          <YStack className="px-2 ">
            <XStack className="items-center justify-between mb-4 ">
              <Text className="text-xl font-bold">My Order</Text>
            </XStack>

            <FlashList
              data={OrderNavigationDataset}
              estimatedItemSize={500}
              horizontal
              renderItem={({ item }) => <NavigationBlob {...item} />}
            />
          </YStack>

          <YStack className="space-y-2 px-2">
            <FlashList
              data={AccountNavivationDataset}
              estimatedItemSize={200}
              ItemSeparatorComponent={() => <View className="mb-2"></View>}
              renderItem={({ item, index }) => (
                <View className="h-[100px]">
                  <Button
                    className="bg-[#D9D9D9]/50 flex-row justify-between items-center"
                    onPress={() => router.push(item.path)}
                  >
                    <Text className="text-base font-semibold">
                      {item.title}
                    </Text>
                    <ChevronRight color="black" />
                  </Button>
                </View>
              )}
            />

            <Button
              disabled={isPending}
              className=" flex-row justify-between items-center"
              onPress={handleLogout}
            >
              {isPending ? (
                <Text className="text-white text-base font-semibold">
                  Processing
                </Text>
              ) : (
                <Text className="text-white text-base font-semibold">
                  Logout
                </Text>
              )}
            </Button>
          </YStack>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
