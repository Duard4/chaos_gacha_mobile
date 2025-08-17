import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Item } from "@/constants/types";
import { useCurrentTheme, useThemeColor } from "@/hooks/useThemeColor";
import { normalizeCategory } from "@/utils/normalizeText";
import * as Clipboard from "expo-clipboard";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface ItemDisplayProps {
  item: Item | null;
  onRoll: () => void | Promise<void>;
  isLoading?: boolean;
}

export const ItemDisplay: React.FC<ItemDisplayProps> = ({
  item,
  onRoll,
  isLoading = false,
}) => {
  // Get theme colors
  const currentTheme = useCurrentTheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = "#0a7ea4";

  const copyToClipboard = async (): Promise<void> => {
    if (!item?.title) {
      Alert.alert("No Item", "Please roll an item first!");
      return;
    }

    const text = `Title: ${item.title}\nRarity: ${item.rarity}\nDescription: ${item.description}`;
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied!", "Item details copied to clipboard");
  };

  // Create theme-aware styles
  const styles = StyleSheet.create({
    itemContainer: {
      padding: 20,
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
    },
    itemTitle: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },
    itemRarity: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 15,
    },
    itemDescription: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 20,
      textAlign: "center",
      color: textColor,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      gap: 10,
    },
    rollButton: {
      backgroundColor: tintColor,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      flex: 1,
    },
    copyButton: {
      backgroundColor: "#34C759",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      flex: 1,
    },
    disabledButton: {
      opacity: 0.6,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
    loadingContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
  });

  return (
    <ThemedView
      style={styles.itemContainer}
      lightColor="rgba(0, 0, 0, 0.05)"
      darkColor="rgba(255, 255, 255, 0.1)"
    >
      <ThemedText
        style={[
          styles.itemTitle,
          {
            color: item?.color || textColor,
          },
        ]}
      >
        {item?.title || "No item rolled yet"}
      </ThemedText>
      <ThemedText
        style={[
          styles.itemRarity,
          {
            color: item?.color || textColor,
          },
        ]}
      >
        {item?.tier || ""} {normalizeCategory(item?.category || "")} (
        {item?.rarity || "—"})
      </ThemedText>
      <ThemedText style={styles.itemDescription}>
        {item?.description || "Roll to get an item."}
      </ThemedText>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.rollButton, isLoading && styles.disabledButton]}
          onPress={onRoll}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <ThemedText style={styles.buttonText}>Rolling...</ThemedText>
            </View>
          ) : (
            <ThemedText style={styles.buttonText}>🎲 ROLL</ThemedText>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <ThemedText style={styles.buttonText}>📋 COPY</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};
