// Import data files
import { Category, Item, Levels } from "@/constants/types";
import abilitiesData from "@/data/abilities.json";
import familiarsData from "@/data/familiars.json";
import itemsData from "@/data/items.json";
import skillsData from "@/data/skills.json";
import traitsData from "@/data/traits.json";
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

export const getRandomItemFromCategory = (
  selectedCategory: Category,
  levels: Levels
): { item: Item | null; actualRarity: number } => {
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

  // Generate rarity based on levels
  const targetRarity = generateRarity(levels.min, levels.max, levels.ave);

  // Try to find items matching the target rarity
  let filteredItems = getItemsByRarityRange(dataSource, targetRarity, 0.5);

  // If no items match, expand the tolerance
  if (filteredItems.length === 0) {
    filteredItems = getItemsByRarityRange(dataSource, targetRarity, 1.0);
  }

  // If still no items, use all items
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

export const generateFallbackItem = (
  levels: Levels
): { item: Item; actualRarity: number } => {
  const fallbackItem: Item = {
    title: "Fallback Item",
    rarity: generateRarity(levels.min, levels.max, levels.ave),
    description: "This is a fallback item generated due to lack of data.",
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
