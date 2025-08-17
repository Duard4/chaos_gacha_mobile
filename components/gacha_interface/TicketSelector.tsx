import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { rarityTicketColors, tickets } from "@/constants/types";
import { useCurrentTheme, useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface TicketSelectorProps {
  selectedTicket: string;
  onTicketSelect: (ticketName: string) => void;
}

export const TicketSelector: React.FC<TicketSelectorProps> = ({
  selectedTicket,
  onTicketSelect,
}) => {
  // Get theme colors
  const currentTheme = useCurrentTheme();
  const tintColor = useThemeColor({}, "tint");

  // Create theme-aware styles
  const styles = StyleSheet.create({
    ticketsContainer: {
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
    ticketGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 8,
    },
    ticketButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 2,
      minWidth: "48%",
      alignItems: "center",
    },
    selectedTicketButton: {
      borderWidth: 3,
      transform: [{ scale: 1.02 }],
    },
    ticketButtonText: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
    selectedTicketButtonText: {
      fontWeight: "700",
    },
  });

  return (
    <ThemedView
      style={styles.ticketsContainer}
      lightColor="rgba(0, 0, 0, 0.03)"
      darkColor="rgba(255, 255, 255, 0.05)"
    >
      <ThemedText style={styles.sectionTitle}>Tickets</ThemedText>
      <View style={styles.ticketGrid}>
        {Object.keys(tickets).map((ticketName) => (
          <TouchableOpacity
            key={ticketName}
            style={[
              styles.ticketButton,
              {
                backgroundColor: rarityTicketColors[ticketName] + "40",
                borderColor: rarityTicketColors[ticketName],
              },
              selectedTicket === ticketName && styles.selectedTicketButton,
            ]}
            onPress={() => onTicketSelect(ticketName)}
          >
            <ThemedText
              style={[
                styles.ticketButtonText,
                { color: rarityTicketColors[ticketName] },
                selectedTicket === ticketName &&
                  styles.selectedTicketButtonText,
              ]}
            >
              {ticketName.charAt(0).toUpperCase() + ticketName.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
};
