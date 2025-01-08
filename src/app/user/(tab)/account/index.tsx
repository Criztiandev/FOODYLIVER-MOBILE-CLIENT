import React, { useEffect, useState } from "react";
import BaseLayout from "@/layout/BaseLayout";
import { ChevronRight, LogOut, User as UserIcon } from "lucide-react-native";
import { Stack, useRouter } from "expo-router";
import XStack from "@/components/stacks/XStack";
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
import useLocalStorage from "@/hooks/utils/useLocalStorage";
import { User } from "@/interface/user.interface";

const RootScreen = () => {
  const [credentials, setCredentials] = useState<User | any>([]);
  const { mutate, isPending } = useLogout();
  const { getItem } = useLocalStorage();
  const router = useRouter();

  const handleLogout = () => {
    mutate("");
  };

  useEffect(() => {
    (async () => {
      const credentials = await getItem("user");
      if (credentials) {
        setCredentials(credentials);
      }
    })();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Account",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <XStack className="space-x-4 px-4">
              <CartButton />
            </XStack>
          ),
        }}
      />
      <BaseLayout>
        <View className="flex-1 bg-gray-50">
          <View className="bg-primary p-6 shadow-lg">
            <XStack className="items-center space-x-4">
              <Avatar
                size={80}
                source={require("@/assets/images/girl-user.png")}
                className="border-2 border-white"
              />
              <YStack className="flex-1">
                <Text className="text-2xl font-bold text-white capitalize">
                  {credentials?.name || "Guest User"}
                </Text>
                <Text className="text-base text-white/80 mt-1">Rider</Text>
              </YStack>
            </XStack>
          </View>

          <View className="p-2">
            <View className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200 min-h-[150px]">
              <Text className="text-xl font-bold text-gray-800 mb-4">
                Account Settings
              </Text>
              <FlashList
                data={AccountNavivationDataset}
                estimatedItemSize={200}
                ItemSeparatorComponent={() => <View className="h-2" />}
                renderItem={({ item }) => (
                  <Button
                    className="bg-gray-100 flex-row justify-between items-center rounded-lg"
                    onPress={() => router.push(item.path)}
                  >
                    <XStack className="items-center space-x-3">
                      <UserIcon color="#F4891F" size={20} />
                      <Text className="text-base font-semibold text-gray-800">
                        {item.title}
                      </Text>
                    </XStack>
                    <ChevronRight color="#F4891F" size={20} />
                  </Button>
                )}
              />
            </View>

            <Button
              disabled={isPending}
              className="bg-white border border-red-500 mt-8  rounded-lg"
              onPress={handleLogout}
            >
              <XStack className="items-center justify-center space-x-2">
                <LogOut color="#EF4444" size={20} />
                <Text
                  className="text-base font-semibold"
                  style={{ color: isPending ? "#6B7280" : "#EF4444" }}
                >
                  {isPending ? "Processing..." : "Logout"}
                </Text>
              </XStack>
            </Button>
          </View>
        </View>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
