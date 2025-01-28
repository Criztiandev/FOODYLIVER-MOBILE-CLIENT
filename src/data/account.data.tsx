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
    title: "Pending",
    path: "/account/order-history/pending",
    icon: <Wallet color="#0FA958" />,
  },

  {
    title: "Ongoing",
    path: "/account/order-history/ongoing",
    icon: <Map color="#BC0505" />,
  },

  {
    title: "Completed",
    path: "/account/order-history/delivered",
    icon: <Box color="black" />,
  },
];

export const AccountNavivationDataset: IAccountNavigationDataSet[] = [
  {
    title: "Update Profile",
    path: "/account/update-profile",
  },
  {
    title: "My Address",
    path: "/account/address",
  },
];
