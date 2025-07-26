import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Item } from "@/constants/types";
import { normalizeCategory } from "@/utils/normalizeText";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface ItemDisplayProps {
  item: Item;
  onRoll: () => void;
}

export const ItemDisplay: React.FC<ItemDisplayProps> = ({ item, onRoll }) => {
  const copyToClipboard = async (): Promise<void> => {
    if (!item.title) {
      Alert.alert("No Item", "Please roll an item first!");
      return;
    }

    const text = `Title: ${item.title}\nRarity: ${item.rarity}\nDescription: ${item.description}`;
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied!", "Item details copied to clipboard");
  };

  return (
    <ThemedView style={styles.itemContainer}>
      <ThemedText
        style={[
          styles.itemTitle,
          {
            color: item?.color || "#888",
          },
        ]}
      >
        {item.title || "No item rolled yet"}
      </ThemedText>
      <ThemedText
        style={[
          styles.itemRarity,
          {
            color: item?.color || "#888",
          },
        ]}
      >
        {item.tier} {normalizeCategory(item.category || "")} (
        {item.rarity || "—"})
      </ThemedText>
      <ThemedText style={styles.itemDescription}>
        {item.description || "Roll to get an item."}
      </ThemedText>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.rollButton} onPress={onRoll}>
          <ThemedText style={styles.buttonText}>🎲 ROLL</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <ThemedText style={styles.buttonText}>📋 COPY</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};
