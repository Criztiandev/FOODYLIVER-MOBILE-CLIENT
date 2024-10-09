import React from "react";
import BaseLayout from "@/layout/BaseLayout";
import { Href, Link, Stack, Tabs, useRouter } from "expo-router";
import XStack from "@/components/stacks/XStack";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bell,
  Heart,
  PuzzleIcon,
  SearchIcon,
  ShoppingCart,
} from "lucide-react-native";
import Input from "@/components/ui/Input";
import YStack from "@/components/stacks/YStack";
import { FlashList } from "@shopify/flash-list";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import CartButton from "@/components/atoms/button/CartButton";
import NotificationButton from "@/components/atoms/button/NotificationButton";

const RootScreen = () => {
  const router = useRouter();
  return (
    <>
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
        <View className="bg-[#EDEDED] mx-2 px-2 border border-gray-300 rounded-md flex-row  items-center my-4">
          <SearchIcon color="black" size={22} opacity={0.7} />
          <Input
            className="border-transparent"
            placeholder="What are your cravings for today?"
          />
        </View>

        <YStack className="px-2 my-4 space-y-2">
          <View className="flex-row justify-between items-center ">
            <XStack className="items-center space-x-2">
              <PuzzleIcon color="black" size={18} />
              <Text className="text-lg font-semibold">Top Categories</Text>
            </XStack>

            <Link href="/_sitemap">More</Link>
          </View>

          <XStack>
            <FlashList
              data={[{}, {}, {}]}
              estimatedItemSize={10000}
              horizontal
              renderItem={() => (
                <TouchableOpacity
                  style={{ flexShrink: 1 }}
                  onPress={() => router.push("/product/list/test")}
                >
                  <ImageBackground
                    resizeMode="cover"
                    source={{ uri: "https://legacy.reactjs.org/logo-og.png" }}
                    className="w-[200px]  border rounded-md justify-center items-center mr-2 overflow-hidden"
                    style={{ height: "100%", minHeight: 100 }}
                  />
                  <Text className="text-white text-lg">Food</Text>
                  <ImageBackground />
                </TouchableOpacity>
              )}
            />
          </XStack>
        </YStack>

        <YStack className="px-2 mb-4 space-y-2">
          <View className="flex-row justify-between items-center ">
            <XStack className="items-center space-x-2">
              <PuzzleIcon color="black" size={18} />
              <Text className="text-lg font-semibold">Promotional</Text>
            </XStack>

            <Link href="/_sitemap">More</Link>
          </View>

          <XStack>
            <FlashList
              data={[{}]}
              estimatedItemSize={10000}
              horizontal
              renderItem={() => (
                <TouchableOpacity
                  onPress={() => router.push("/product/list/test")}
                  style={{
                    width: Dimensions.get("screen").width - 16,
                  }}
                  className=" h-[200px] border rounded-md p-4 flex justify-center items-center mr-2"
                >
                  <Text className="text-lg font-bold">Fast Food</Text>
                </TouchableOpacity>
              )}
            />
          </XStack>
        </YStack>

        <YStack>
          <FlashList
            data={[
              { title: "All" },
              { title: "RECOMMENDED" },
              { title: "POPULAR" },
              { title: "Nearby" },
            ]}
            estimatedItemSize={2000}
            horizontal
            renderItem={({ item }) => (
              <Button variant="ghost">
                <Text className="text-lg font-bold ">{item.title}</Text>
              </Button>
            )}
          />

          <View className="flex-1 px-2">
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
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
