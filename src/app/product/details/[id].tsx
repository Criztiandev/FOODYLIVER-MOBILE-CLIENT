import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import { Stack, useRouter } from "expo-router";
import {
  ChevronLeft,
  Heart,
  MessageSquare,
  Share2,
  View,
} from "lucide-react-native";
import React from "react";
import { Share, Text, TouchableOpacity } from "react-native";

const RootScreen = () => {
  const router = useRouter();
  return (
    <>
      <BaseLayout>
        <Stack.Screen
          options={{
            title: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <ChevronLeft color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <XStack>
                <TouchableOpacity>
                  <Heart color="black" />
                </TouchableOpacity>
              </XStack>
            ),
          }}
        />

        <YStack className="justify-center items-center px-2 relative">
          <View className="  flex-1 absolute top-0 left-0"></View>

          <Avatar size={200} />

          <XStack className=" w-full justify-between items-center ">
            <YStack className="space-y-1">
              <MessageSquare color="black" />
              <Text className="font-bold text-[16px]">Review</Text>
            </YStack>

            <YStack className="space-y-1 justify-center items-center mt-[32px]">
              <Text className="text-[18px] text-white font-bold p-2 text-center  bg-primary rounded-full border-2 border-white">
                4.1
              </Text>
              <Text className="font-bold text-[16px]">Rating</Text>
            </YStack>

            <YStack className="space-y-1">
              <Share2 color="black" />
              <Text className="font-bold text-[16px]">Share</Text>
            </YStack>
          </XStack>
        </YStack>

        <YStack className="jsutify-center items-center">
          <Text className="text-[52px] font-bold">Burger</Text>
          <Text className="text-xl font-bold opacity-50">PHP 900</Text>
        </YStack>

        <YStack className="space-y-2 px-2">
          <Text className="font-bold text-[24px]">Add-ons</Text>
          <XStack className="space-x-4">
            <Button variant="outline" className="border border-[#BC0505]">
              <Text className="text-base font-bold text-primary">
                Extra Patty +26.00
              </Text>
            </Button>
            <Button variant="outline" className="border-black">
              <Text className="text-base font-bold text-black">
                Extra Patty +26.00
              </Text>
            </Button>
          </XStack>
        </YStack>

        <YStack>
          <Text className="font-bold text-[24px]">Quantity</Text>
          <XStack className="space-x-4 items-center">
            <Text className="text-base opacity-70">01</Text>
            <Text className="text-[32px]">02</Text>
            <Text className="text-base opacity-70">03</Text>
          </XStack>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
