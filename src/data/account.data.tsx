import { Href } from "expo-router";
import { Box, History, Map, Star, Wallet } from "lucide-react-native";
import { ReactElement, ReactNode } from "react";

export interface IAccountNavigationDataSet {
  title: string;
  path: Href;
}

export interface IOrderNavigationDataset extends IAccountNavigationDataSet {
  title: string;
  path: Href;
  icon: ReactElement | ReactNode;
}

export const OrderNavigationDataset: IOrderNavigationDataset[] = [
  {
    title: "To Pay",
    path: "/account/order-history/pay",
    icon: <Wallet color="#0FA958" />,
  },

  {
    title: "To Track",
    path: "/account/order-history/track",
    icon: <Map color="#BC0505" />,
  },

  {
    title: "To Recieve",
    path: "/account/order-history/recieve",
    icon: <Box color="black" />,
  },

  {
    title: "To Rate",
    path: "/account/order-history/rate",
    icon: <Star color="#FFC700" />,
  },

  {
    title: "History",
    path: "/account/order-history/history",
    icon: <History color="black" />,
  },
];

export const AccountNavivationDataset: IAccountNavigationDataSet[] = [
  {
    title: "Update Profile",
    path: "/account/update-profile",
  },
];
