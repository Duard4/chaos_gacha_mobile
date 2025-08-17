// HomeScreen.tsx (index.tsx)
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Import types and utilities
import { tickets } from "@/constants/types";
import {
  generateFallbackItem,
  getRandomItemFromCategory,
} from "@/utils/dataService";

// Import components
import { FilterStatusIndicator } from "@/components/FilterStatusIndicator";
import { CategorySelector } from "@/components/gacha_interface/CategorySelector";
import { ItemDisplay } from "@/components/gacha_interface/ItemDisplay";
import { LevelsConfig } from "@/components/gacha_interface/LevelsConfig";
import { TicketSelector } from "@/components/gacha_interface/TicketSelector";
import { LoadingWrapper } from "@/components/LoadingWrapper";

// Import store
import { useCurrentTheme, useThemeColor } from "@/hooks/useThemeColor";
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

  // Local loading state for roll operations
  const [isRolling, setIsRolling] = useState(false);

  // Get theme colors
  const currentTheme = useCurrentTheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  const rollItem = async (): Promise<void> => {
    if (isRolling) return; // Prevent multiple concurrent rolls

    setIsRolling(true);

    try {
      const result = await getRandomItemFromCategory(category, levels);

      if (result.item) {
        setCurrentItem(result.item);
        addRollToHistory(result.item, result.actualRarity);
      } else {
        // Fallback to random generation if no data available
        const fallbackResult = await generateFallbackItem(levels);
        setCurrentItem(fallbackResult.item);
        addRollToHistory(fallbackResult.item, fallbackResult.actualRarity);
      }
    } catch (error) {
      console.error("Error rolling item:", error);

      // Generate fallback item on error
      try {
        const fallbackResult = await generateFallbackItem(levels);
        setCurrentItem(fallbackResult.item);
        addRollToHistory(fallbackResult.item, fallbackResult.actualRarity);
      } catch (fallbackError) {
        console.error("Error generating fallback item:", fallbackError);

        // Ultimate fallback - create a basic item
        const emergencyItem = {
          title: "Error Recovery Item",
          rarity: "1.0",
          description:
            "An item generated due to a system error. Please try again.",
          tier: "System",
          category: category,
        };
        setCurrentItem(emergencyItem);
        addRollToHistory(emergencyItem, 1.0);
      }
    } finally {
      setIsRolling(false);
    }
  };

  const applyTicket = (ticketName: string): void => {
    const [min, ave, max] = tickets[ticketName];
    setLevels({ min, ave, max });
    setTicket(ticketName);
  };

  // Create styles inside component to access theme colors
  const styles = StyleSheet.create({
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
      color: currentTheme === "dark" ? "#fdf7fdff" : "#ffffff",
      fontSize: 48,
      lineHeight: 56,
      fontWeight: "bold",
      textAlign: "center",
      textShadowColor:
        currentTheme === "dark" ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0.85)",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
      zIndex: 2,
    },
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: "#A1CEDC",
        dark: "#1D3D47",
      }}
      headerImage={
        <ThemedView
          style={styles.headerContent}
          lightColor="transparent"
          darkColor="transparent"
        >
          <Image
            source={require("@/assets/images/stars-galaxy.jpg")}
            style={styles.headerImage}
          />
          <ThemedText
            type="title"
            style={styles.titleOverlay}
            lightColor="#ffffff"
            darkColor="#fdf7fdff"
          >
            Chaos Gacha
          </ThemedText>
        </ThemedView>
      }
    >
      <ItemDisplay item={currentItem} onRoll={rollItem} isLoading={isRolling} />

      <LevelsConfig levels={levels} onLevelsChange={setLevels} />

      <CategorySelector
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      <TicketSelector selectedTicket={ticket} onTicketSelect={applyTicket} />
      <FilterStatusIndicator />
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
