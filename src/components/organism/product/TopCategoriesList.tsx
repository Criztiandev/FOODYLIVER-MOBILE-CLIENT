import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { PuzzleIcon } from "lucide-react-native";
import { FlashList } from "@shopify/flash-list";
import { useFetchCategories } from "@/hooks/categories/query";
import SectionLoadingScreen from "@/layout/screen/SectionLoadingScreen";
import CategoriesCard from "@/components/molecules/card/CategoriesCard";

interface Category {
  id: string;
  name: string;
  image: string;
  thumbnail: string;
}

const CategoryHeader = () => (
  <View style={styles.headerContainer}>
    <PuzzleIcon color="black" size={18} />
    <Text style={styles.headerText}>Top Categories</Text>
  </View>
);

const EmptyState = () => (
  <View style={styles.emptyStateContainer}>
    <View style={styles.emptyStateInner}>
      <Text style={styles.emptyStateText}>No Available Categories</Text>
    </View>
  </View>
);

const ErrorState = () => (
  <View style={styles.errorStateContainer}>
    <View style={styles.errorStateInner}>
      <Text style={styles.errorStateText}>Something went wrong</Text>
    </View>
  </View>
);

const TopCategoriesList = () => {
  const { isLoading, isError, data: result } = useFetchCategories();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <CategoryHeader />
        </View>
        <SectionLoadingScreen />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <CategoryHeader />
        <ErrorState />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}></View>

      {result?.data?.length > 0 ? (
        <View>
          <FlashList<Category>
            data={result.data}
            estimatedItemSize={100}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoriesCard {...item} thumbnail={item.image} />
            )}
          />
        </View>
      ) : (
        <EmptyState />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    marginVertical: 16,
    gap: 8,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F4891F",
  },
  emptyStateContainer: {
    height: 200,
  },
  emptyStateInner: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9CA3AF",
    width: "100%",
    borderRadius: 6,
    opacity: 0.7,
  },
  emptyStateText: {
    fontWeight: "600",
    fontSize: 18,
  },
  errorStateContainer: {
    height: 200,
    backgroundColor: "#E5E7EB",
  },
  errorStateInner: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9CA3AF",
    width: "100%",
    borderRadius: 6,
    opacity: 0.7,
  },
  errorStateText: {
    fontWeight: "600",
    fontSize: 18,
  },
});

export default TopCategoriesList;
