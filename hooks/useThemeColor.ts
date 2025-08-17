/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

let globalTheme = "dark"; // Default theme
let themeListeners: ((theme: "light" | "dark") => void)[] = [];

// Global function to update theme
export const updateGlobalTheme = (newTheme: "light" | "dark") => {
  globalTheme = newTheme;
  themeListeners.forEach((listener) => listener(newTheme));
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    globalTheme as "light" | "dark"
  );

  useEffect(() => {
    // Load theme from AsyncStorage on mount
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("isDarkTheme");
        const isDark = savedTheme ? JSON.parse(savedTheme) : true;
        const theme = isDark ? "dark" : "light";
        updateGlobalTheme(theme);
        setCurrentTheme(theme);
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };

    loadTheme();

    // Listen for theme changes
    const listener = (theme: "light" | "dark") => {
      setCurrentTheme(theme);
    };

    themeListeners.push(listener);

    // Cleanup
    return () => {
      const index = themeListeners.indexOf(listener);
      if (index > -1) {
        themeListeners.splice(index, 1);
      }
    };
  }, []);

  const colorFromProps = props[currentTheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[currentTheme][colorName];
  }
}

// Hook for components that need to know the current theme
export function useCurrentTheme() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    globalTheme as "light" | "dark"
  );

  useEffect(() => {
    // Load theme from AsyncStorage on mount
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("isDarkTheme");
        const isDark = savedTheme ? JSON.parse(savedTheme) : true;
        const theme = isDark ? "dark" : "light";
        updateGlobalTheme(theme);
        setCurrentTheme(theme);
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };

    loadTheme();

    // Listen for theme changes
    const listener = (theme: "light" | "dark") => {
      setCurrentTheme(theme);
    };

    themeListeners.push(listener);

    // Cleanup
    return () => {
      const index = themeListeners.indexOf(listener);
      if (index > -1) {
        themeListeners.splice(index, 1);
      }
    };
  }, []);

  return currentTheme;
}
