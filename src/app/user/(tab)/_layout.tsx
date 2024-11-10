import React from "react";
import { Tabs } from "expo-router";
import { Home, UserCircle } from "lucide-react-native";

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#F4891F",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 0, // Remove top border
          elevation: 8, // Android shadow
          shadowColor: "#000", // iOS shadow
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarItemStyle: {
          height: 48,
          padding: 6,
        },
        tabBarActiveTintColor: "#FFFFFF", // Active tab text/icon color
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.7)", // Inactive tab text/icon color
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          paddingBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: (props) => (
            <Home color="white" opacity={props.focused ? 1 : 0.5} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: (props) => (
            <UserCircle color="white" opacity={props.focused ? 1 : 0.5} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
