import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Levels } from "@/constants/types";
import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "./styles";

interface LevelsConfigProps {
  levels: Levels;
  onLevelsChange: (levels: Levels) => void;
}

export const LevelsConfig: React.FC<LevelsConfigProps> = ({
  levels,
  onLevelsChange,
}) => {
  const updateLevel = (field: keyof Levels, value: string): void => {
    const numValue = parseFloat(value) || 0;
    const clampedValue = Math.max(0.1, Math.min(10, numValue));
    onLevelsChange({ ...levels, [field]: clampedValue });
  };

  return (
    <ThemedView style={styles.levelsContainer}>
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
            placeholderTextColor="#666"
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
            placeholderTextColor="#666"
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
            placeholderTextColor="#666"
          />
        </View>
      </View>
    </ThemedView>
  );
};
