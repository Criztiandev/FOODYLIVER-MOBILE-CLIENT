import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import BaseLayout from "@/layout/BaseLayout";
import { Href, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import XStack from "@/components/stacks/XStack";
import { Heart, ShoppingCart } from "lucide-react-native";
import Avatar from "@/components/ui/Avatar";
import YStack from "@/components/stacks/YStack";
import BackButton from "@/components/atoms/button/BackButton";

const RootScreen = () => {
  const { status } = useLocalSearchParams();
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{ title: `${status}`, headerLeft: () => <BackButton /> }}
      />
      <BaseLayout>
        <View className="flex-1 px-2 pt-4">
          <FlashList
            data={[{}, {}, {}, {}, {}]}
            estimatedItemSize={5000}
            numColumns={2}
            renderItem={() => (
              <TouchableOpacity
                className="relative"
                onPress={() =>
                  router.navigate(`/product/details/${123123}` as Href)
                }
              >
                <XStack className=" absolute top-1  w-full  p-2 px-3 justify-between items-center flex-1 z-[99px]">
                  <TouchableOpacity>
                    <Heart color="black" size={28} />
                  </TouchableOpacity>

                  <View className="p-2 bg-white rounded-full">
                    <Text className="text-lg font-bold">4.2</Text>
                  </View>
                </XStack>

                <View className="bg-[#FCDEDE] relative p-4 flex-2 flex-1   rounded-md m-1 justify-center items-center space-y-4">
                  <View className="mt-6">
                    <Avatar size={100} />
                  </View>
                  <XStack className="items-center justify-between w-full">
                    <YStack>
                      <Text className="font-bold text-[24px]">Burger</Text>
                      <Text className="text-[16px] font-bold">PHP 72.00</Text>
                    </YStack>

                    <TouchableOpacity>
                      <ShoppingCart size={24} color="black" />
                    </TouchableOpacity>
                  </XStack>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
