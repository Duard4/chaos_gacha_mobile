// HomeScreen.tsx (index.tsx)
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";

// Import types and utilities
import { tickets } from "@/constants/types";
import {
  generateFallbackItem,
  getRandomItemFromCategory,
} from "@/utils/dataService";

// Import components
import { CategorySelector } from "@/components/gacha_interface/CategorySelector";
import { ItemDisplay } from "@/components/gacha_interface/ItemDisplay";
import { LevelsConfig } from "@/components/gacha_interface/LevelsConfig";
import { TicketSelector } from "@/components/gacha_interface/TicketSelector";
import { LoadingWrapper } from "@/components/LoadingWrapper";

// Import store
import { useGachaStore } from "@/store/gachaStore";

function HomeScreenContent() {
  // Use Zustand store
  const {
    currentItem,
    levels,
    category,
    ticket,
    setCurrentItem,
    setLevels,
    setCategory,
    setTicket,
    addRollToHistory,
  } = useGachaStore();

  const rollItem = (): void => {
    const result = getRandomItemFromCategory(category, levels);

    if (result.item) {
      setCurrentItem(result.item);
      addRollToHistory(result.item, result.actualRarity);
    } else {
      // Fallback to random generation if no data available
      const fallbackResult = generateFallbackItem(levels);
      setCurrentItem(fallbackResult.item);
      addRollToHistory(fallbackResult.item, fallbackResult.actualRarity);
    }
  };

  const applyTicket = (ticketName: string): void => {
    const [min, ave, max] = tickets[ticketName];
    setLevels({ min, ave, max });
    setTicket(ticketName);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <View style={styles.headerContent}>
          <Image
            source={require("@/assets/images/stars-galaxy.jpg")}
            style={styles.headerImage}
          />
          <ThemedText type="title" style={styles.titleOverlay}>
            Chaos Gacha
          </ThemedText>
        </View>
      }
    >
      <ItemDisplay item={currentItem} onRoll={rollItem} />

      <LevelsConfig levels={levels} onLevelsChange={setLevels} />

      <CategorySelector
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      <TicketSelector selectedTicket={ticket} onTicketSelect={applyTicket} />
    </ParallaxScrollView>
  );
}

export default function HomeScreen() {
  return (
    <LoadingWrapper>
      <HomeScreenContent />
    </LoadingWrapper>
  );
}

export const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  titleOverlay: {
    position: "absolute",
    color: "#fdf7fdff",
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    zIndex: 2,
  },
});
