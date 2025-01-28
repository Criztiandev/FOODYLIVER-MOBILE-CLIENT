import { View, Text, StyleSheet } from "react-native";
import React from "react";
import YStack from "@/components/stacks/YStack";
import XStack from "@/components/stacks/XStack";
import { Box, Star, Tag } from "lucide-react-native";
import { ProductItem } from "@/interface/product.interface";
import { Image } from "expo-image";

interface Props
  extends Pick<
    ProductItem,
    "name" | "price" | "rating" | "stocks" | "description" | "thumbnail"
  > {}

const ProductHero = ({
  name,
  price,
  stocks,
  description,
  thumbnail,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: thumbnail
              ? `https://jandbfoodapp.site/storage/${thumbnail}`
              : "https://placehold.co/600x400",
          }}
          style={styles.image}
        />
      </View>

      <YStack style={styles.contentContainer}>
        <Text style={styles.title}>{name || "Burger"}</Text>
        <XStack style={styles.statsContainer}>
          <XStack style={styles.statItem}>
            <Star color="#EA9937" />
            <Text style={styles.statText}>5 Ratings</Text>
          </XStack>

          <XStack style={styles.statItem}>
            <Tag color="#EA9937" />
            <Text style={styles.statText}>{price} Price</Text>
          </XStack>

          <XStack style={styles.statItem}>
            <Box color="#EA9937" />
            <Text style={styles.statText}>{stocks} Left</Text>
          </XStack>
        </XStack>
      </YStack>

      {Boolean(description) && (
        <YStack style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </YStack>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F4891F",
  },
  contentContainer: {
    paddingVertical: 16,
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#78716c",
  },
  descriptionContainer: {
    width: "100%",
  },
  description: {
    color: "#1f2937",
  },
});

export default ProductHero;
