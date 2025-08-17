import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Levels } from "@/constants/types";
import { useCurrentTheme, useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface LevelsConfigProps {
  levels: Levels;
  onLevelsChange: (levels: Levels) => void;
}

export const LevelsConfig: React.FC<LevelsConfigProps> = ({
  levels,
  onLevelsChange,
}) => {
  // Get theme colors
  const currentTheme = useCurrentTheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  const updateLevel = (field: keyof Levels, value: string): void => {
    const numValue = parseFloat(value) || 0;
    const clampedValue = Math.max(0.1, Math.min(10, numValue));
    onLevelsChange({ ...levels, [field]: clampedValue });
  };

  // Create theme-aware styles
  const styles = StyleSheet.create({
    levelsContainer: {
      padding: 20,
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
      color: tintColor,
    },
    levelsGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
    levelInput: {
      flex: 1,
      alignItems: "center",
    },
    levelLabel: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
      color: textColor,
    },
    input: {
      borderWidth: 1,
      borderColor:
        currentTheme === "dark"
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(0, 0, 0, 0.2)",
      backgroundColor:
        currentTheme === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0.9)",
      color: textColor,
      padding: 12,
      borderRadius: 8,
      fontSize: 16,
      textAlign: "center",
      width: "100%",
    },
  });

  return (
    <ThemedView
      style={styles.levelsContainer}
      lightColor="rgba(0, 0, 0, 0.03)"
      darkColor="rgba(255, 255, 255, 0.05)"
    >
      <ThemedText style={styles.sectionTitle}>Levels Configuration</ThemedText>
      <View style={styles.levelsGrid}>
        <View style={styles.levelInput}>
          <ThemedText style={styles.levelLabel}>Min Level</ThemedText>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={levels.min.toString()}
            onChangeText={(val) => updateLevel("min", val)}
            placeholder="0.1"
            placeholderTextColor={currentTheme === "dark" ? "#888" : "#666"}
          />
        </View>
        <View style={styles.levelInput}>
          <ThemedText style={styles.levelLabel}>Ave Level</ThemedText>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={levels.ave.toString()}
            onChangeText={(val) => updateLevel("ave", val)}
            placeholder="5.0"
            placeholderTextColor={currentTheme === "dark" ? "#888" : "#666"}
          />
        </View>
        <View style={styles.levelInput}>
          <ThemedText style={styles.levelLabel}>Max Level</ThemedText>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={levels.max.toString()}
            onChangeText={(val) => updateLevel("max", val)}
            placeholder="10.0"
            placeholderTextColor={currentTheme === "dark" ? "#888" : "#666"}
          />
        </View>
      </View>
    </ThemedView>
  );
};
