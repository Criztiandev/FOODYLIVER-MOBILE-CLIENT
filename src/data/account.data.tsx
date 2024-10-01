import { Href } from "expo-router";
import { Box, History, Map, Star, Wallet } from "lucide-react-native";
import { ReactElement, ReactNode } from "react";

export interface IAccontNavigationDataSet {
  title: string;
  path: Href;
  icon: ReactElement | ReactNode;
}

export const AccountNavigationDataSet: IAccontNavigationDataSet[] = [
  {
    title: "To Pay",
    path: "/account/order-history/pay",
    icon: <Wallet color="black" />,
  },

  {
    title: "To Track",
    path: "/account/order-history/track",
    icon: <Map color="black" />,
  },

  {
    title: "To Recieve",
    path: "/account/order-history/recieve",
    icon: <Box color="black" />,
  },

  {
    title: "To Rate",
    path: "/account/order-history/rate",
    icon: <Star color="black" />,
  },

  {
    title: "History",
    path: "/account/order-history/",
    icon: <History color="black" />,
  },
];

