import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Category, categories } from "@/constants/types";
import React from "react";
import {
  DimensionValue,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles } from "./styles";

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const { width } = useWindowDimensions();

  const getCategoriesPerRow = () => {
    if (width < 768) return 1;
    if (width < 1028) return 2;
    return 3;
  };

  const buttonWidth: DimensionValue = `${Math.floor(
    100 / getCategoriesPerRow() - 1
  )}%`;

  return (
    <ThemedView style={styles.categoriesContainer}>
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
