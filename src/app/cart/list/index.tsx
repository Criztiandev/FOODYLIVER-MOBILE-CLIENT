import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import useCartStore from "@/state/useCartStore";
import { FlashList } from "@shopify/flash-list";
import { Stack, useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  Minus,
  Phone,
  Pin,
  Plus,
  ShoppingCart,
  User,
} from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const RootScreen = () => {
  const router = useRouter();
  const { cart } = useCartStore();

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <ChevronLeft color="black" />
            </TouchableOpacity>
          ),
          title: "Product Details",
        }}
      />
      <BaseLayout>
        <YStack className="p-4">
          <YStack>
            <XStack className="justify-between items-center">
              <Text className="text-2xl font-bold">CHECKOUT</Text>

              <TouchableOpacity>
                <Text className="text-lg font-medium">Select All</Text>
              </TouchableOpacity>
            </XStack>

            <FlashList
              data={cart.items}
              estimatedItemSize={10000}
              renderItem={({ item }) => (
                <XStack className="bg-[#FCDEDE] p-4 rounded-md justify-between items-ce my-4">
                  <XStack className="items-center space-x-4">
                    <Avatar />
                    <YStack>
                      <Text className="text-[24px] font-bold">{item.name}</Text>

                      {/* Addons */}

                      <Text className="text-[18px] font-bold opacity-70">
                        PHP {item.price}
                      </Text>
                    </YStack>
                  </XStack>

                  <XStack className="items-center">
                    <Button variant="ghost">
                      <Minus color="black" />
                    </Button>

                    <Text className="text-2xl">{item.quantity}</Text>

                    <Button variant="ghost">
                      <Plus color="black" />
                    </Button>
                  </XStack>
                </XStack>
              )}
            />
          </YStack>

          <YStack className=" w-full space-y-4 my-4">
            <Text className="font-bold text-[20px]">DELIVERY INFORMATION</Text>

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

            <XStack className="space-x-4">
              <Button
                variant="outline"
                className="border-2 border-[#BC0505] flex-row space-x-2"
              >
                <Check color="#BC0505" />
                <Text className="font-bold text-md text-primary">
                  Cash on Delivery
                </Text>
              </Button>

              <Button variant="outline">
                <Text className="font-bold text-md">Gcash</Text>
              </Button>
            </XStack>
          </YStack>

          <YStack className="space-y-2">
            <Text className="font-bold text-[20px]">SubTotals</Text>
            <XStack className="space-x-4">
              <XStack>
                <User color="black" />
                <Text className="text-lg">Order Total</Text>
              </XStack>
              <Text className="text-lg">PHP 568.00</Text>
            </XStack>

            <XStack className="space-x-4">
              <XStack>
                <User color="black" />
                <Text className="text-lg">Delivery Fee</Text>
              </XStack>
              <Text className="text-lg">PHP 48.00</Text>
            </XStack>

            <XStack className="space-x-4">
              <XStack>
                <User color="black" />
                <Text className="text-lg">Total</Text>
              </XStack>
              <Text className="text-lg">0</Text>
            </XStack>
          </YStack>

          <Button className="my-8">
            <XStack className="space-x-4">
              <ShoppingCart color="white" />
              <Text className="text-white text-lg">Checkout Order</Text>
            </XStack>
          </Button>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
