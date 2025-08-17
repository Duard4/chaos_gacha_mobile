import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { RollLogEntry, useGachaStore } from "@/store/gachaStore";
import { normalizeCategory } from "@/utils/normalizeText";
import { router } from "expo-router";
import React from "react";
import {
  DimensionValue,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

interface RollHistoryItemProps {
  roll: RollLogEntry;
  onSelect: (item: RollLogEntry) => void;
}

const RollHistoryItem: React.FC<RollHistoryItemProps> = ({
  roll,
  onSelect,
}) => {
  const rarityColor = roll.item.color;
  const rarityLabel = roll.item.tier;

  return (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => onSelect(roll)}
      activeOpacity={0.7}
    >
      <View style={styles.itemHeader}>
        <ThemedText style={styles.itemTitle} numberOfLines={3}>
          {roll.item.title}
        </ThemedText>
        <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
          <ThemedText style={styles.rarityText}>
            {roll.rarity.toFixed(1)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.itemDetails}>
        <ThemedText style={[styles.rarityLabel, { color: rarityColor }]}>
          {rarityLabel} {normalizeCategory(roll.item.category || "")}
        </ThemedText>
        <ThemedText style={styles.timestamp}>
          {roll.timestamp.toLocaleTimeString()}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default function RollHistory() {
  const { rollHistory, clearHistory, setCurrentItem } = useGachaStore();
  const width = useWindowDimensions().width;

  const getStatsPerRow = () => {
    if (width < 600) return 2;
    return 4;
  };
  const buttonWidth: DimensionValue = `${Math.floor(
    100 / getStatsPerRow() - 1
  )}%`;

  const handleSelectRoll = (roll: RollLogEntry) => {
    setCurrentItem(roll.item);
    router.push("/(tabs)/");
  };

  const handleDirectClear = () => {
    clearHistory();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ThemedText style={styles.title}>Roll History</ThemedText>
            {rollHistory.length > 0 && (
              <ThemedText style={styles.subtitle}>
                {rollHistory.length} total rolls
              </ThemedText>
            )}
          </View>
          {rollHistory.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleDirectClear}
            >
              <ThemedText style={styles.clearButtonText}>Clear All</ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        {rollHistory.length === 0 ? (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyIcon}>📜</ThemedText>
            <ThemedText style={styles.emptyText}>No rolls yet!</ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Go to the Home tab and start rolling to see your history here
            </ThemedText>
            <TouchableOpacity
              style={styles.goHomeButton}
              onPress={() => router.push("/(tabs)/")}
            >
              <ThemedText style={styles.goHomeButtonText}>
                Go to Gacha
              </ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Statistics */}
            <View style={styles.stats}>
              <View style={[styles.statItem, { width: buttonWidth }]}>
                <ThemedText style={styles.statValue}>
                  {rollHistory.length}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Total Rolls</ThemedText>
              </View>
              <View style={[styles.statItem, { width: buttonWidth }]}>
                <ThemedText style={styles.statValue}>
                  {rollHistory.length > 0
                    ? (
                        rollHistory.reduce(
                          (sum, roll) => sum + roll.rarity,
                          0
                        ) / rollHistory.length
                      ).toFixed(1)
                    : "0.0"}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Avg Rarity</ThemedText>
              </View>
            </View>

            {/* History List */}
            <FlatList
              data={rollHistory}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RollHistoryItem roll={item} onSelect={handleSelectRoll} />
              )}
              style={styles.list}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  clearButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  clearButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginHorizontal: 20,
    rowGap: 20,
    marginVertical: 15,
    borderRadius: 16,
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textTransform: "uppercase",
    textAlign: "center",
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 100,
  },
  historyItem: {
    maxHeight: 130,
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    paddingBottom: 24,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },
  rarityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 45,
    alignItems: "center",
  },
  rarityText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    height: "60%",
  },
  rarityLabel: {
    position: "absolute",
    left: 0,
    bottom: 5,
    fontSize: 17,
    fontWeight: "500",
    opacity: 0.9,
  },
  timestamp: {
    position: "absolute",
    right: 0,
    bottom: 5,
    fontSize: 14,
    opacity: 0.6,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
    lineHeight: 96,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  goHomeButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  goHomeButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
