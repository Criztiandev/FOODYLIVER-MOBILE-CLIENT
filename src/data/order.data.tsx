import { Href } from "expo-router";
import { Box, History, Map, Star, Wallet } from "lucide-react-native";
import { ReactElement, ReactNode } from "react";

export interface IOrderDataSet {
  title: string;
  icon: ReactElement | ReactNode;
}

export const OrderDataSet: IOrderDataSet[] = [
  {
    title: "Pay",
    icon: <Wallet color="black" />,
  },

  {
    title: "Track",
    icon: <Map color="black" />,
  },

  {
    title: "Recieve",
    icon: <Box color="black" />,
  },

  {
    title: "Rate",
    icon: <Star color="black" />,
  },
];
