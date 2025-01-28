import { View, Text, StyleSheet } from "react-native";
import React from "react";
import XStack from "@/components/stacks/XStack";
import { PuzzleIcon } from "lucide-react-native";
import { FlashList } from "@shopify/flash-list";
import PromotionalCard from "@/components/molecules/card/PromotionalCard";
import { useFetchPromotional } from "@/hooks/promotional/query";
import SectionLoadingScreen from "@/layout/screen/SectionLoadingScreen";

interface Promotion {
  id: string;
  name: string;
  description: string;
  image: string;
}

const PromotionalHeader = () => (
  <View style={styles.headerContainer}>
    <PuzzleIcon color="black" size={18} />
    <Text style={styles.headerText}>Promotional</Text>
  </View>
);

const EmptyState = () => (
  <View style={styles.emptyStateContainer}>
    <Text style={styles.stateText}>No Available Promotions</Text>
  </View>
);

const ErrorState = () => (
  <View style={styles.errorContainer}>
    <View style={styles.emptyStateContainer}>
      <Text style={styles.stateText}>Something went wrong</Text>
    </View>
  </View>
);

const PromotionalList = () => {
  const { isLoading, isError, data: result } = useFetchPromotional();

  const getRandomPromotions = (
    promotions: Promotion[] = [],
    count: number = 3
  ): Promotion[] => {
    if (!promotions?.length) return [];

    const safeCount = Math.min(count, promotions.length);
    const shuffled = [...promotions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, safeCount);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <PromotionalHeader />
        </View>
        <SectionLoadingScreen />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <PromotionalHeader />
        <ErrorState />
      </View>
    );
  }

  const randomPromotions = getRandomPromotions(result?.data);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <PromotionalHeader />
      </View>

      <XStack>
        {result?.data?.length > 0 ? (
          <FlashList
            data={randomPromotions}
            estimatedItemSize={200}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: { item: Promotion }) => (
              <PromotionalCard
                {...item}
                name={item.name}
                thumbnail={item.image}
              />
            )}
          />
        ) : (
          <EmptyState />
        )}
      </XStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 16,
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9CA3AF",
    width: "100%",
    borderRadius: 8,
    opacity: 0.7,
  },
  stateText: {
    fontWeight: "600",
    fontSize: 18,
  },
  errorContainer: {
    height: 200,
    backgroundColor: "#E5E7EB",
  },
});

export default PromotionalList;
