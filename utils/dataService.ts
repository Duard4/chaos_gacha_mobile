// Import data files
import { Category, Item, Levels } from "@/constants/types";
import abilitiesData from "@/data/abilities.json";
import familiarsData from "@/data/familiars.json";
import itemsData from "@/data/items.json";
import skillsData from "@/data/skills.json";
import traitsData from "@/data/traits.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { normalizeText } from "./normalizeText";

const categoryData: Record<Category, any[]> = {
  abilities: abilitiesData,
  items: itemsData,
  traits: traitsData,
  skills: skillsData,
  familiars: familiarsData,
  random: [], // Will be populated from all categories
};

export const generateRarity = (
  min: number,
  max: number,
  avg: number,
  exponent: number = 2
): number => {
  const floatMax = parseFloat(max.toString());
  const floatMin = parseFloat(min.toString());
  const floatAvg = parseFloat(avg.toString());

  const randarr: number[] = [];
  const weights: number[] = [];

  let x = floatMin;
  while (x < floatMax) {
    randarr.push(x);
    x += 0.1;
    // Calculate weight: 1 / (exponent ^ |avg - x|)
    const weight = 1 / Math.pow(exponent, Math.abs(floatAvg - x));
    weights.push(weight);
  }

  // Weighted random selection
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return parseFloat((randarr[i] + 0.1).toFixed(1));
    }
  }

  // Fallback to last element
  return parseFloat((randarr[randarr.length - 1] + 0.1).toFixed(1));
};

// Filter items by rarity range
const getItemsByRarityRange = (
  dataSource: any[],
  targetRarity: number,
  tolerance: number = 0.5
): any[] => {
  return dataSource.filter((item) => {
    const itemRarity = parseFloat(item.rarity);
    return Math.abs(itemRarity - targetRarity) <= tolerance;
  });
};

// Filter items based on user preferences
const filterItemsByPreferences = async (items: any[]): Promise<any[]> => {
  try {
    const excludeCharacterDrops = await AsyncStorage.getItem(
      "excludeCharacterDrops"
    );
    const excludeTechDrops = await AsyncStorage.getItem("excludeTechDrops");

    const shouldExcludeCharacter = excludeCharacterDrops
      ? JSON.parse(excludeCharacterDrops)
      : false;
    const shouldExcludeTech = excludeTechDrops
      ? JSON.parse(excludeTechDrops)
      : false;

    return items.filter((item) => {
      const description = item.description || "";

      // Check for character drops exclusion
      if (shouldExcludeCharacter && description.startsWith("#(Character)")) {
        return false;
      }

      // Check for tech drops exclusion
      if (shouldExcludeTech && description.startsWith("#(Tech)")) {
        return false;
      }

      return true;
    });
  } catch (error) {
    console.error("Error loading filter preferences:", error);
    // If there's an error loading preferences, return all items
    return items;
  }
};

export const getRandomItemFromCategory = async (
  selectedCategory: Category,
  levels: Levels
): Promise<{ item: Item | null; actualRarity: number }> => {
  let dataSource: any[] = [];

  if (selectedCategory === "random") {
    // Combine all categories for random selection
    dataSource = [
      ...abilitiesData,
      ...itemsData,
      ...traitsData,
      ...skillsData,
      ...familiarsData,
    ];
  } else {
    dataSource = categoryData[selectedCategory];
  }

  if (dataSource.length === 0) {
    return { item: null, actualRarity: 0 };
  }

  // Apply user preference filters
  dataSource = await filterItemsByPreferences(dataSource);

  // If all items are filtered out, return fallback
  if (dataSource.length === 0) {
    console.warn("All items filtered out by user preferences, using fallback");
    return await generateFallbackItem(levels);
  }

  // Generate rarity based on levels
  const targetRarity = generateRarity(levels.min, levels.max, levels.ave);

  // Try to find items matching the target rarity
  let filteredItems = getItemsByRarityRange(dataSource, targetRarity, 0.5);

  // If no items match, expand the tolerance
  if (filteredItems.length === 0) {
    filteredItems = getItemsByRarityRange(dataSource, targetRarity, 1.0);
  }

  // If still no items, use all remaining items
  if (filteredItems.length === 0) {
    filteredItems = dataSource;
  }

  const randomIndex = Math.floor(Math.random() * filteredItems.length);
  const item = filteredItems[randomIndex];

  // Prepare the item
  const processedItem: Item = {
    ...item,
    description: normalizeText(item.description),
    rarity: parseFloat(item.rarity).toFixed(1),
    category:
      selectedCategory !== "random"
        ? selectedCategory
        : // Determine category for random selection
        abilitiesData.includes(item)
        ? "abilities"
        : itemsData.includes(item)
        ? "items"
        : traitsData.includes(item)
        ? "traits"
        : skillsData.includes(item)
        ? "skills"
        : familiarsData.includes(item)
        ? "familiars"
        : "random",
  };

  return { item: processedItem, actualRarity: targetRarity };
};

export const generateFallbackItem = async (
  levels: Levels
): Promise<{ item: Item; actualRarity: number }> => {
  const fallbackItem: Item = {
    title: "Fallback Item",
    rarity: generateRarity(levels.min, levels.max, levels.ave),
    description:
      "This is a fallback item generated due to lack of available data.",
    tier: "N/A",
    category: "random",
  };

  return {
    item: fallbackItem,
    actualRarity:
      typeof fallbackItem.rarity === "number"
        ? fallbackItem.rarity
        : parseFloat(fallbackItem.rarity),
  };
};

// Utility function to get filter status for UI display
export const getFilterStatus = async (): Promise<{
  excludeCharacterDrops: boolean;
  excludeTechDrops: boolean;
  isDarkTheme: boolean;
}> => {
  try {
    const [characterDrops, techDrops, theme] = await AsyncStorage.multiGet([
      "excludeCharacterDrops",
      "excludeTechDrops",
      "isDarkTheme",
    ]);

    return {
      excludeCharacterDrops: characterDrops[1]
        ? JSON.parse(characterDrops[1])
        : false,
      excludeTechDrops: techDrops[1] ? JSON.parse(techDrops[1]) : false,
      isDarkTheme: theme[1] ? JSON.parse(theme[1]) : true,
    };
  } catch (error) {
    console.error("Error getting filter status:", error);
    return {
      excludeCharacterDrops: false,
      excludeTechDrops: false,
      isDarkTheme: true,
    };
  }
};
