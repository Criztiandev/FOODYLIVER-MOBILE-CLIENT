import BackButton from "@/components/atoms/button/BackButton";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { AccountNavigationDataSet } from "@/data/account.data";
import { OrderDataSet } from "@/data/order.data";
import BaseLayout from "@/layout/BaseLayout";
import { FlashList } from "@shopify/flash-list";
import { Link, Stack, useRouter } from "expo-router";
import { Truck } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const RootScreen = () => {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Order History",
        }}
      />

      <BaseLayout>
        <YStack className="p-2 space-y-4">
          <FlashList
            horizontal
            data={OrderDataSet}
            estimatedItemSize={300}
            renderItem={({ item }) => (
              <TouchableOpacity className="mr-2  justify-center items-center rounded-md border p-2 border-[#bc0505] flex-row space-x-2 ">
                {item.icon}
                <Text className="text-base">{item.title}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            onPress={() =>
              router.push(`/account/order-history/details/${123123123}`)
            }
          >
            <YStack className="rounded-md border border-[#bc0505] p-2 space-y-2 ">
              <XStack className="space-x-2">
                <Avatar size={48} />
                <YStack className=" flex-shrink">
                  <Text className="text-base font-semibold text-primary flex-shrink">
                    Burger with extra patty, Shanghai, Pizza Pe...
                  </Text>
                  <XStack className="justify-end">
                    <Text className="text-end text-base">
                      Order Total:
                      <Text className="text-[#FF7C02] font-bold">
                        PHP 616.00
                      </Text>
                    </Text>
                  </XStack>
                </YStack>
              </XStack>
            </YStack>
          </TouchableOpacity>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
