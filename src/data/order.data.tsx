import { Href } from "expo-router";
import { Box, History, Map, Star, Wallet } from "lucide-react-native";
import { ReactElement, ReactNode } from "react";

export interface IOrderDataSet {
  title: string;
  icon: ReactElement | ReactNode;
}

export const OrderDataSet: IOrderDataSet[] = [
  {
    title: "To Pay",
    icon: <Wallet color="black" />,
  },

  {
    title: "To Track",
    icon: <Map color="black" />,
  },

  {
    title: "To Recieve",
    icon: <Box color="black" />,
  },

  {
    title: "To Rate",
    icon: <Star color="black" />,
  },
];
