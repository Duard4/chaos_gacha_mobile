import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getFilterStatus } from "@/utils/dataService";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface FilterStatusIndicatorProps {
  onPress?: () => void; // Optional callback to navigate to options
}

export const FilterStatusIndicator: React.FC<FilterStatusIndicatorProps> = ({
  onPress,
}) => {
  const [filterStatus, setFilterStatus] = useState({
    excludeCharacterDrops: false,
    excludeTechDrops: false,
    isDarkTheme: true,
  });

  const backgroundColor = useThemeColor(
    { light: "#f3f4f6", dark: "#374151" },
    "background"
  );

  const borderColor = useThemeColor(
    { light: "#d1d5db", dark: "#4b5563" },
    "border"
  );

  useEffect(() => {
    loadFilterStatus();

    // Set up an interval to check for filter changes
    const interval = setInterval(loadFilterStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadFilterStatus = async () => {
    try {
      const status = await getFilterStatus();
      setFilterStatus(status);
    } catch (error) {
      console.error("Error loading filter status:", error);
    }
  };

  const hasActiveFilters =
    filterStatus.excludeCharacterDrops || filterStatus.excludeTechDrops;

  if (!hasActiveFilters) {
    return null; // Don't show anything if no filters are active
  }

  const activeFilters = [];
  if (filterStatus.excludeCharacterDrops) {
    activeFilters.push("Character");
  }
  if (filterStatus.excludeTechDrops) {
    activeFilters.push("Tech");
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor, borderColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconSymbol
        name="line.horizontal.3.decrease.circle"
        size={16}
        color="#F59E0B"
      />
      <ThemedText style={styles.text}>
        Filtering: {activeFilters.join(", ")} drops
      </ThemedText>
      {onPress && <IconSymbol name="chevron.right" size={12} color="#9CA3AF" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
    color: "#F59E0B",
  },
});
