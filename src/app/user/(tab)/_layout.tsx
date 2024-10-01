import React from "react";
import { Tabs } from "expo-router";
import { Home, UserCircle } from "lucide-react-native";

const RootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: (props) => (
            <Home color={props.focused ? "black" : props.color} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: (props) => (
            <UserCircle color={props.focused ? "black" : props.color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
