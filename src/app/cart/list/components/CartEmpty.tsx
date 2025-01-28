import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import React from "react";
import { Text, StyleSheet, View } from "react-native";

const CartEmpty = () => {
  const router = useRouter();
  return (
    <YStack style={styles.container}>
      <Image
        style={styles.image}
        contentFit="contain"
        source={require("@/assets/images/Girl-magnify.png")}
      />
      <YStack style={styles.content}>
        <Text style={styles.title}>Your Cart is Empty</Text>
        <Text style={styles.subtitle}>
          Looks like you haven't added any items yet
        </Text>
        <Button style={styles.button} onPress={() => router.push("/")}>
          <View style={styles.buttonContent}>
            <ShoppingBag color="white" size={20} />
            <Text style={styles.buttonText}>Start Shopping</Text>
          </View>
        </Button>
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "80%",
    height: 240,
    marginBottom: 32,
  },
  content: {
    alignItems: "center",
    gap: 16,
    maxWidth: "80%",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#F4891F",
    borderRadius: 8,
    elevation: 2,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CartEmpty;
