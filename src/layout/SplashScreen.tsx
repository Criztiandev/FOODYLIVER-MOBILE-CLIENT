import { View, Text, Alert, StyleSheet } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import { Image } from "expo-image";
import useLocalStorage from "@/hooks/utils/useLocalStorage";
import Button from "@/components/ui/Button";

interface Props {
  setSplash: (value: boolean) => void;
}

const SplashScreen = ({ setSplash }: Props) => {
  const { setItem } = useLocalStorage();

  const handleLogin = async () => {
    try {
      await setItem("splash", "true");
      setSplash(false);
    } catch (error) {
      console.error("Error saving splash state:", error);
      Alert.alert("Error", "Something went wrong. Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <YStack style={styles.container}>
      <YStack style={styles.contentContainer}>
        <YStack style={styles.headerContainer}>
          <Text style={styles.brandText}>J&B</Text>
          <Text style={styles.titleText}>Food Delivery</Text>
        </YStack>

        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/splash/drawing-hero.png")}
            contentFit="contain"
            style={styles.image}
          />
        </View>

        <Text style={styles.taglineText}>
          Discover your next favorite meal with us
        </Text>

        <Button onPress={handleLogin}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Button>
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  contentContainer: {
    alignItems: "center",
    gap: 40,
  },
  headerContainer: {
    alignItems: "center",
  },
  brandText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#F4891F",
    letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 36,
    color: "#F4891F",
    fontWeight: "bold",
  },
  imageContainer: {
    height: 256,
    width: "100%",
  },
  image: {
    flex: 1,
  },
  taglineText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 32,
    color: "#F4891F",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 32,
  },
});

export default SplashScreen;
