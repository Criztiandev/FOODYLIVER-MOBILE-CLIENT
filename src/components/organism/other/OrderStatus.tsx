import React from "react";
import { View, Text } from "react-native";
import {
  CreditCard,
  Truck,
  CheckCircle,
  LucideIcon,
} from "lucide-react-native";

type OrderStatus = "pending" | "ongoing" | "delivered";

interface StatusConfig {
  message: string;
  subMessage: string;
  icon: LucideIcon;
  color: string;
}

interface StatusConfigs {
  [key: string]: StatusConfig;
}

interface OrderStatusProps {
  status?: OrderStatus;
}

const statusConfig: StatusConfigs = {
  pending: {
    message: "On Delivery",
    subMessage: "Your order is being delivered",
    icon: Truck,
    color: "#CA8A04", // keeping yellow for visual distinction
  },
  ongoing: {
    message: "Order Delivered",
    subMessage: "Your order is on the way",
    icon: Truck,
    color: "#2563EB",
  },
  delivered: {
    message: "Order Completed",
    subMessage: "Thank you for your purchase",
    icon: CheckCircle,
    color: "#16A34A",
  },
};

const OrderStatus: React.FC<OrderStatusProps> = ({ status = "pending" }) => {
  const { message, subMessage, icon: Icon, color } = statusConfig[status];

  return (
    <View style={{ marginVertical: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginRight: 8 }}>
          {message}
        </Text>
        <Icon color={color} size={32} />
      </View>
      <Text style={{ textAlign: "center", color: "#666", marginTop: 8 }}>
        {subMessage}
      </Text>
    </View>
  );
};

export default OrderStatus;
