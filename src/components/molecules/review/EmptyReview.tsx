import YStack from "@/components/stacks/YStack";
import Button from "@/components/ui/Button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import React from "react";
import { Text, View, StyleSheet, Animated } from "react-native";

const EmptyReview = () => {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const generateRandomMessage = () => {
    const messages = [
      "Awaiting your thoughts to light up this space ✨",
      "Your review could be the first star in our sky 🌟",
      "Share your experience and inspire others 💫",
      "Be the trendsetter - write the first review! 🎯",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        style={styles.image}
        contentFit="contain"
        source={require("@/assets/images/Girl-magnify.png")}
      />
      <YStack style={styles.content}>
        <Text style={styles.title}>No Reviews Yet</Text>
        <Text style={styles.message}>{generateRandomMessage()}</Text>
        <Text style={styles.subtitle}>
          Your feedback helps others make better choices
        </Text>
        <Button style={styles.button} onPress={() => router.back()}>
          <View style={styles.buttonContent}>
            <MessageCircle color="#F4891F" size={20} />
            <Text style={styles.buttonText}>Write a Review</Text>
          </View>
        </Button>
      </YStack>
    </Animated.View>
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
    width: "85%",
    height: 240,
    marginBottom: 32,
  },
  content: {
    alignItems: "center",
    gap: 16,
    maxWidth: "85%",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    marginTop: 24,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: "#FEF3E7",
    borderRadius: 12,
    elevation: 0,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  buttonText: {
    color: "#F4891F",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default EmptyReview;
