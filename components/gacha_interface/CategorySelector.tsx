import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Category, categories } from "@/constants/types";
import { useCurrentTheme, useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const { width } = useWindowDimensions();

  // Get theme colors
  const currentTheme = useCurrentTheme();
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  const getCategoriesPerRow = () => {
    if (width < 768) return 1;
    if (width < 1028) return 2;
    return 3;
  };

  const buttonWidth: DimensionValue = `${Math.floor(
    100 / getCategoriesPerRow() - 1
  )}%`;

  // Create theme-aware styles
  const styles = StyleSheet.create({
    categoriesContainer: {
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
    categoryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 10,
    },
    categoryButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 2,
      backgroundColor:
        currentTheme === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.05)",
      borderColor:
        currentTheme === "dark"
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.1)",
    },
    selectedCategoryButton: {
      backgroundColor: tintColor + "20",
      borderColor: tintColor,
    },
    categoryButtonText: {
      fontSize: 16,
      fontWeight: "500",
      textAlign: "center",
      color: textColor,
    },
    selectedCategoryButtonText: {
      color: tintColor,
      fontWeight: "700",
    },
  });

  return (
    <ThemedView
      style={styles.categoriesContainer}
      lightColor="rgba(0, 0, 0, 0.03)"
      darkColor="rgba(255, 255, 255, 0.05)"
    >
      <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
      <View style={styles.categoryGrid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
              { width: buttonWidth },
            ]}
            onPress={() => onCategoryChange(category)}
          >
            <ThemedText
              style={[
                styles.categoryButtonText,
                selectedCategory === category &&
                  styles.selectedCategoryButtonText,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
};
