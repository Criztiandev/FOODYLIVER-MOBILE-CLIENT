import BackButton from "@/components/atoms/button/BackButton";
import SelectField from "@/components/form/SelectField";
import OrderHistoryCard from "@/components/molecules/card/OrderHistoryCard";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import BaseSelect from "@/components/ui/Select";
import { OrderDataSet } from "@/data/order.data";
import BaseLayout from "@/layout/BaseLayout";
import { Picker } from "@react-native-picker/picker";
import { FlashList } from "@shopify/flash-list";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";

const RootScreen = () => {
  const router = useRouter();
  const form = useForm();
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

          <YStack>
            <OrderHistoryCard />
          </YStack>
        </YStack>
      </BaseLayout>
    </>
  );
};

export default RootScreen;
