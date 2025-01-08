import React from "react";
import { Text, View } from "react-native";
import { Mail, Phone, Receipt, Wallet, MapPin } from "lucide-react-native";
import Button from "@/components/ui/Button";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import useDeliverOrder from "@/hooks/order/useDeliverOrder";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

// Separate OrderItem component with improved UI
interface OrderCardProps {
  item: {
    id: string;
    transaction_id: string;
    customer: {
      name: string;
      email?: string;
      phone_number?: string;
      address?: string;
      user_id: string;
    };
    payment_method: string;
    longitude: string;
    latitude: string;
    total_amount: number;
    status: string;
  };
}

const OrderCard = React.memo(({ item }: OrderCardProps) => {
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError } = useDeliverOrder(
    item.id || ""
  );

  const handleViewDetails = () => {
    router.push({
      pathname: "/order/delivery/[id]" as any,
      params: {
        id: item.transaction_id,
        customer_id: item.customer.user_id,
        long: item.longitude,
        lat: item.latitude,
      },
    });
  };

  const handleTrackOrder = () => {
    try {
      if (item.status === "PENDING") {
        mutate({
          transaction_id: item.transaction_id,
          status: "ONGOING",
        });
      }

      router.push(
        `/order/track/${item.transaction_id}?customer_id=${item.customer.user_id}&long=${item.latitude}&lat=${item.latitude}` as any
      );
    } catch (error) {
      console.error("Error tracking order:", error);
      Toast.show({
        type: "error",
        text1: "Delivery Error",
        text2: "Failed to complete delivery. Please try again.",
      });
    }
  };

  const paymentMethod = item?.payment_method;
  const paymentMethodText =
    paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment";

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "ONGOING":
        return {
          container: "bg-blue-100 px-3 py-1 rounded-full",
          text: "text-blue-700 font-medium",
        };
      case "PENDING":
        return {
          container: "bg-yellow-100 px-3 py-1 rounded-full",
          text: "text-yellow-700 font-medium",
        };
      default:
        return {
          container: "bg-green-100 px-3 py-1 rounded-full",
          text: "text-green-700 font-medium",
        };
    }
  };

  const statusStyle = getStatusStyle(item.status);

  return (
    <View className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200">
      <YStack className="space-y-4">
        <XStack className="justify-between items-center">
          <Text className="text-2xl capitalize font-bold text-[#FF7C02]">
            {item?.customer?.name}
          </Text>
          <View className={statusStyle.container}>
            <Text className={statusStyle.text}>{item.status}</Text>
          </View>
        </XStack>

        <View className="h-[1px] bg-gray-200" />

        <YStack className="space-y-3">
          {item?.customer?.email && (
            <XStack className="items-center space-x-3">
              <View className="bg-orange-100 p-2 rounded-full">
                <Mail color="#FF7C02" size={18} />
              </View>
              <Text className="flex-1 text-gray-600">
                {item?.customer?.email}
              </Text>
            </XStack>
          )}

          {item?.customer?.phone_number && (
            <XStack className="items-center space-x-3">
              <View className="bg-orange-100 p-2 rounded-full">
                <Phone color="#FF7C02" size={18} />
              </View>
              <Text className="flex-1 text-gray-600">
                {item?.customer?.phone_number}
              </Text>
            </XStack>
          )}

          {item?.customer?.address && (
            <XStack className="items-center space-x-3">
              <View className="bg-orange-100 p-2 rounded-full">
                <MapPin color="#FF7C02" size={18} />
              </View>
              <Text className="flex-1 text-gray-600">
                {item?.customer?.address}
              </Text>
            </XStack>
          )}

          <View className="bg-orange-50 p-3 rounded-lg">
            <XStack className="justify-between items-center">
              <XStack className="items-center space-x-2">
                <Wallet color="#FF7C02" size={18} />
                <Text className="text-gray-700">{paymentMethodText}</Text>
              </XStack>
              <XStack className="items-center space-x-2">
                <Receipt color="#FF7C02" size={18} />
                <Text className="text-gray-700 font-bold">
                  ₱{item?.total_amount}
                </Text>
              </XStack>
            </XStack>
          </View>
        </YStack>

        <XStack className="justify-end space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-[#FF7C02]"
            onPress={handleViewDetails}
          >
            <Text className="text-[#FF7C02] font-medium">View Details</Text>
          </Button>

          <Button
            variant="default"
            size="sm"
            className="border-[#FF7C02]"
            onPress={handleTrackOrder}
            disabled={isPending}
          >
            <Text className="text-white font-medium">
              {isPending ? "Processing..." : "Deliver Order"}
            </Text>
          </Button>
        </XStack>
      </YStack>
    </View>
  );
});

export default OrderCard;
