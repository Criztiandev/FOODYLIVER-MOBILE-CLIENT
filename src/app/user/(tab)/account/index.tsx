import React, { useEffect, useState } from "react";
import BaseLayout from "@/layout/BaseLayout";
import { ChevronRight, LogOut, User as UserIcon } from "lucide-react-native";
import { Stack, useRouter } from "expo-router";
import XStack from "@/components/stacks/XStack";
import CartButton from "@/components/atoms/button/CartButton";
import Avatar from "@/components/ui/Avatar";
import YStack from "@/components/stacks/YStack";
import { Text, View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Button from "@/components/ui/Button";
import NavigationBlob from "./components/NavigationBlob";
import {
  AccountNavivationDataset,
  OrderNavigationDataset,
} from "@/data/account.data";
import useLogout from "@/hooks/account/useLogout";
import useLocalStorage from "@/hooks/utils/useLocalStorage";
import { User } from "@/interface/user.interface";

const RootScreen = () => {
  const [credentials, setCredentials] = useState<User | any>([]);
  const { mutate, isPending } = useLogout();
  const { getItem } = useLocalStorage();
  const router = useRouter();

  const handleLogout = () => {
    mutate("");
  };

  useEffect(() => {
    (async () => {
      const credentials = await getItem("user");
      if (credentials) {
        setCredentials(credentials);
      }
    })();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Account",
          headerTitleStyle: { color: "white" },
          headerStyle: {
            backgroundColor: "#f4891f",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <XStack style={styles.headerRight}>
              <CartButton />
            </XStack>
          ),
        }}
      />
      <BaseLayout>
        <View style={styles.container}>
          <View style={styles.header}>
            <XStack style={styles.headerContent}>
              <Avatar
                size={80}
                source={require("@/assets/images/girl-user.png")}
                style={styles.avatar}
              />
              <YStack style={styles.flex1}>
                <Text style={styles.userName}>
                  {credentials?.name || "Guest User"}
                </Text>
                <Text style={styles.accountType}>Customer Account</Text>
              </YStack>
            </XStack>
          </View>

          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>My Orders</Text>
              <FlashList
                data={OrderNavigationDataset}
                estimatedItemSize={500}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <NavigationBlob {...item} />}
              />
            </View>

            <View style={[styles.card, styles.accountCard]}>
              <Text style={styles.cardTitle}>Account Settings</Text>
              <FlashList
                data={AccountNavivationDataset}
                estimatedItemSize={200}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => (
                  <Button
                    style={styles.settingsButton}
                    onPress={() => router.push(item.path)}
                  >
                    <XStack style={styles.settingsButtonContent}>
                      <UserIcon color="#F4891F" size={20} />
                      <Text style={styles.settingsButtonText}>
                        {item.title}
                      </Text>
                    </XStack>
                    <ChevronRight color="#F4891F" size={20} />
                  </Button>
                )}
              />
            </View>

            <Button
              disabled={isPending}
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <XStack style={styles.logoutContent}>
                <LogOut color="#EF4444" size={20} />
                <Text
                  style={[
                    styles.logoutText,
                    isPending && styles.logoutTextDisabled,
                  ]}
                >
                  {isPending ? "Processing..." : "Logout"}
                </Text>
              </XStack>
            </Button>
          </View>
        </View>
      </BaseLayout>
    </>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    columnGap: 16,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#f4891f",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    alignItems: "center",
    columnGap: 16,
  },
  avatar: {
    borderWidth: 2,
    borderColor: "white",
  },
  flex1: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textTransform: "capitalize",
  },
  accountType: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  content: {
    padding: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  accountCard: {
    minHeight: 200,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  separator: {
    height: 8,
  },
  settingsButton: {
    backgroundColor: "#f3f4f6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
  },
  settingsButtonContent: {
    alignItems: "center",
    columnGap: 12,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  logoutButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ef4444",
    marginTop: 32,
    borderRadius: 8,
  },
  logoutContent: {
    alignItems: "center",
    justifyContent: "center",
    columnGap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ef4444",
  },
  logoutTextDisabled: {
    color: "#6B7280",
  },
});

export default RootScreen;
