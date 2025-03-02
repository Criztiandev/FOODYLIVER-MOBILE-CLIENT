import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Href, useRouter } from "expo-router";

interface Category {
  id: number;
  name: string;
  thumbnail?: string;
  category_id: number;
  description?: string;
  price?: number;
  stocks?: number;
  is_available?: number;
  addons?: string;
  created_at?: string;
  updated_at?: string;
}

interface AddonsCardProps {
  categories: Category[];
  title?: string;
}

const AddonsCard: React.FC<AddonsCardProps> = ({
  categories,
  title = "Categories",
}) => {
  const router = useRouter();

  const handleCategoryPress = (categoryId: number) => {
    router.navigate(`/product/details/${categoryId}` as Href);
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category?.id}
            style={styles?.AddonsCard}
            onPress={() => handleCategoryPress(category?.id)}
          >
            {category?.thumbnail ? (
              <Image
                source={{
                  uri: category?.thumbnail
                    ? `https://jandbfoodapp.site/storage/${category?.thumbnail}`
                    : "https://placehold.co/600x400",
                }}
                style={styles?.categoryImage}
              />
            ) : (
              <View style={styles?.placeholderImage} />
            )}
            <Text style={styles?.categoryName} numberOfLines={1}>
              {category?.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  scrollContent: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  AddonsCard: {
    width: 100,
    marginRight: 12,
    alignItems: "center",
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    backgroundColor: "#f3f4f6",
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    backgroundColor: "#e5e7eb",
  },
  categoryName: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default AddonsCard;
