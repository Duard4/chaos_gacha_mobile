import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { rarityTicketColors, tickets } from "@/constants/types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface TicketSelectorProps {
  selectedTicket: string;
  onTicketSelect: (ticketName: string) => void;
}

export const TicketSelector: React.FC<TicketSelectorProps> = ({
  selectedTicket,
  onTicketSelect,
}) => {
  return (
    <ThemedView style={styles.ticketsContainer}>
      <ThemedText style={styles.sectionTitle}>Tickets</ThemedText>
      <View style={styles.ticketGrid}>
        {Object.keys(tickets).map((ticketName) => (
          <TouchableOpacity
            key={ticketName}
            style={[
              styles.ticketButton,
              { backgroundColor: rarityTicketColors[ticketName] + "40" },
              { borderColor: rarityTicketColors[ticketName] },
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
