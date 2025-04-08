import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import XStack from "@/components/stacks/XStack";
import { ShoppingCart } from "lucide-react-native";
import { Href, useRouter } from "expo-router";
import { ProductItem } from "@/interface/product.interface";
import useCartStore from "@/state/useCartStore";
import { Image } from "expo-image";

const ProductCard = (props: ProductItem) => {
  const router = useRouter();
  const { addProduct } = useCartStore();

  const handleAdd = () => {
    addProduct(props, 1);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.navigate(
          `/product/details/${props.id}?status=${props.category_id}` as Href
        )
      }
    >
      <View style={styles.priceContainer}>
        <Text style={styles.price}>₱ {props.price}</Text>
      </View>
      <XStack style={styles.ratingContainer}>
        {!!props.rating && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{props.rating}</Text>
          </View>
        )}
      </XStack>

      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `https://jandbfoodapp.site/storage/${props.thumbnail}`,
            }}
            style={styles.image}
          />
        </View>
        <XStack style={styles.productInfo}>
          <XStack style={{ flex: 1 }}>
            <Text style={styles.productName}>
              {!!props.name?.length && props.name.length < 10
                ? props.name
                : `${props.name?.substring(0, 10)}..`}
            </Text>
          </XStack>

          <TouchableOpacity onPress={handleAdd} style={styles.cartButton}>
            <ShoppingCart size={24} color="#F4891F" />
          </TouchableOpacity>
        </XStack>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  priceContainer: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 99,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 4,
    borderRadius: 6,
  },
  ratingContainer: {
    position: "absolute",
    top: 4,
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 99,
  },
  ratingBadge: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 9999,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContent: {
    backgroundColor: "rgba(244, 137, 31, 0.2)",
    position: "relative",
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 120,
    objectFit: "cover",
  },
  productInfo: {
    width: "100%",
    padding: 16,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "capitalize",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartButton: {
    padding: 4,
  },
});

export default ProductCard;
