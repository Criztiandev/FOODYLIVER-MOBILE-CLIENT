import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  Coins,
  Phone,
  ReceiptText,
  Truck,
  Wallet,
  Star,
} from "lucide-react-native";

import HomeButton from "@/components/atoms/button/HomeButton";
import XStack from "@/components/stacks/XStack";
import YStack from "@/components/stacks/YStack";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import BaseLayout from "@/layout/BaseLayout";
import LoadingScreen from "@/layout/screen/LoadingScreen";
import ErrorScreen from "@/layout/screen/ErrorScreen";
import { useFetchOrderDetailsList } from "@/hooks/delivery/useFetchOrderDetailsList";
import InputField from "@/components/form/InputField";
import { FormProvider, useForm } from "react-hook-form";
import useRateOrder from "@/hooks/order/useRateOrder";

// Types
interface OrderItem {
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  is_available: boolean;
}

interface OrderSummaryProps {
  orderType: string;
  total_amount: number;
  delivery_fee?: number;
}

interface RiderInfoProps {
  name: string;
  phone: string;
  avatar: string;
  address: string;
}

interface RatingProps {
  maxRating: number;
  onRatingChange: (rating: number) => void;
}

// Components
const StarRating: React.FC<RatingProps> = ({
  maxRating = 5,
  onRatingChange,
}) => {
  const [rating, setRating] = useState(0);

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <XStack style={styles.ratingContainer}>
      {[...Array(maxRating)].map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleRating(index + 1)}
          style={styles.starButton}
        >
          <Star
            size={40}
            color={index < rating ? "#F4891F" : "#D1D5DB"}
            fill={index < rating ? "#F4891F" : "none"}
          />
        </TouchableOpacity>
      ))}
    </XStack>
  );
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderType,
  total_amount,
  delivery_fee = 25,
}) => {
  const finalTotal =
    orderType === "COD" ? total_amount + delivery_fee : total_amount;

  return (
    <View style={styles.summaryContainer}>
      <XStack style={styles.summaryHeader}>
        <ReceiptText color="#F4891F" size={24} />
        <Text style={styles.summaryTitle}>Order Summary</Text>
      </XStack>

      <View style={styles.summaryContent}>
        {orderType === "COD" && (
          <XStack style={styles.summaryRow}>
            <XStack style={styles.iconTextGroup}>
              <Truck color="#F4891F" size={20} />
              <Text style={styles.labelText}>Delivery Fee</Text>
            </XStack>
            <Text style={styles.valueText}>₱ {delivery_fee}</Text>
          </XStack>
        )}

        <XStack style={styles.summaryRow}>
          <XStack style={styles.iconTextGroup}>
            <Coins color="#F4891F" size={20} />
            <Text style={styles.labelText}>Sub Total</Text>
          </XStack>
          <Text style={styles.valueText}>₱ {total_amount}</Text>
        </XStack>

        <View style={styles.totalSection}>
          <XStack style={styles.summaryRow}>
            <XStack style={styles.iconTextGroup}>
              <Wallet color="#F4891F" size={20} />
              <Text style={styles.totalLabel}>Total</Text>
            </XStack>
            <Text style={styles.totalAmount}>₱ {finalTotal}</Text>
          </XStack>
        </View>
      </View>
    </View>
  );
};

const RiderInfo: React.FC<RiderInfoProps> = ({
  name,
  phone,
  avatar,
  address,
}) => (
  <View style={styles.riderContainer}>
    <XStack style={styles.riderContent}>
      <Avatar size={80} source={avatar} style={styles.riderAvatar} />
      <YStack style={styles.riderInfo}>
        <Text style={styles.riderName}>{name}</Text>
        <Text style={styles.riderRole}>Rider</Text>
        <XStack style={styles.phoneContainer}>
          <Phone size={16} color="white" />
          <Text style={styles.phoneText}>{phone || "N/A"}</Text>
        </XStack>
        <Text style={styles.addressText} numberOfLines={2}>
          {address}
        </Text>
      </YStack>
    </XStack>
  </View>
);

const RootScreen = () => {
  const { transaction_id } = useLocalSearchParams();
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const { data, isLoading, isError, error } = useFetchOrderDetailsList(
    transaction_id as string
  );
  const { mutate: rateOrder, isPending } = useRateOrder();

  const handleRatingSubmit = (rating: number) => {
    methods.setValue("rating", rating);
  };

  const onSubmit = methods.handleSubmit((data) => {
    if (!data.rating) {
      Alert.alert("Error", "Please select a rating first!");
      return;
    }
    Alert.alert(
      "Success",
      `Thank you for your rating!\nRating: ${data.rating}\nComment: ${data.comment}`
    );
    rateOrder({
      transaction_id: transaction_id as string,
      rating: data.rating,
      comment: data.comment,
    });
    // router.push("/");
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) {
    console.error("Order Error:", error);
    return <ErrorScreen />;
  }

  const selectedOrderDetails = data[0].find(
    (items: any) => items.transaction_id === transaction_id
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <HomeButton />,
          title: "Rate Order",
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />

      <BaseLayout>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {selectedOrderDetails?.rider && (
            <RiderInfo
              name={selectedOrderDetails.rider.name}
              phone={selectedOrderDetails.rider.phone}
              address={selectedOrderDetails.rider.address}
              avatar={require("@/assets/images/girl-user.png")}
            />
          )}

          <View style={styles.contentContainer}>
            <View style={styles.rateContainer}>
              <Text style={styles.rateTitle}>How was your order?</Text>
              <Text style={styles.rateSubtitle}>
                Your feedback helps us improve our service
              </Text>

              <FormProvider {...methods}>
                <StarRating maxRating={5} onRatingChange={handleRatingSubmit} />

                <InputField
                  label="Comment"
                  name="comment"
                  placeholder="Write your comment here"
                  multiline={true}
                  numberOfLines={4}
                />

                <Button
                  onPress={onSubmit}
                  disabled={isPending}
                  style={[
                    styles.skipButton,
                    { backgroundColor: "#F4891F", marginBottom: 12 },
                  ]}
                >
                  <Text style={[styles.skipButtonText, { color: "white" }]}>
                    Submit Rating
                  </Text>
                </Button>

                <Button
                  onPress={() => router.push("/")}
                  style={styles.skipButton}
                >
                  <Text style={styles.skipButtonText}>Skip Rating</Text>
                </Button>
              </FormProvider>
            </View>
          </View>
        </ScrollView>
      </BaseLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#f4891f",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  contentContainer: {
    padding: 16,
    flex: 1,
  },
  rateContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rateTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  rateSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  starButton: {
    padding: 4,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  skipButtonText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
  },
  summaryContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  summaryHeader: {
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 12,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginLeft: 8,
  },
  summaryContent: {
    gap: 16,
  },
  summaryRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconTextGroup: {
    alignItems: "center",
    gap: 12,
  },
  labelText: {
    fontSize: 16,
    color: "#4b5563",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  totalSection: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f4891f",
  },
  riderContainer: {
    backgroundColor: "#f4891f",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(244, 137, 31, 0.3)",
  },
  riderContent: {
    alignItems: "center",
    gap: 20,
  },
  riderAvatar: {
    borderWidth: 3,
    borderColor: "white",
  },
  riderInfo: {
    flex: 1,
    gap: 4,
  },
  riderName: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },
  riderRole: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  phoneContainer: {
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  phoneText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 15,
  },
  addressText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 4,
  },
  statusContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  statusContent: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLeft: {
    alignItems: "center",
    gap: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  statusText: {
    fontWeight: "600",
    fontSize: 16,
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  deliveryImage: {
    height: 200,
    width: "100%",
  },
  successMessageContainer: {
    padding: 20,
    backgroundColor: "rgba(244, 137, 31, 0.1)",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  successMessage: {
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    color: "#f4891f",
  },
  orderListContainer: {
    gap: 12,
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 8,
  },
  orderThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
    gap: 4,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  orderDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f4891f",
  },
  buttonContainer: {
    gap: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  trackButton: {
    backgroundColor: "#f4891f",
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#f4891f",
    borderRadius: 12,
  },
  callButton: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
  },
  callButtonText: {
    fontSize: 18,
    color: "#f4891f",
    fontWeight: "700",
  },
  orderListTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
});

export default RootScreen;
