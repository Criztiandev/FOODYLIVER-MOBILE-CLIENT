import BackButton from "@/components/atoms/button/BackButton";
import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import useCartStore from "@/state/useCartStore";
import { Stack, useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import { Text } from "react-native";
import SelectedProducts from "./components/CartSelectedProduct";
import CartCalculation from "./components/CartCalculation";
import CartEmpty from "./components/CartEmpty";
import PaymentButton from "@/components/atoms/button/PaymentButton";

const RootScreen = () => {
  const router = useRouter();
  const { cart } = useCartStore();

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Product Details",
        }}
      />

      {cart.items && cart.items.length > 0 ? (
        <BaseLayout>
          <YStack className="px-4 my-4">
            <SelectedProducts />
            <Button
              className="flex-row space-x-2 justify-start border-primary"
              variant="outline"
              onPress={() => router.push("/")}
            >
              <Plus color="black" size={18} />
              <Text className="text-base ">Add more items</Text>
            </Button>
          </YStack>

          <YStack className="px-4">
            <CartCalculation />
            <PaymentButton />
          </YStack>
        </BaseLayout>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};

export default RootScreen;
