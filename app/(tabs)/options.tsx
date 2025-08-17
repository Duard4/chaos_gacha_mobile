import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  updateGlobalTheme,
  useCurrentTheme,
  useThemeColor,
} from "@/hooks/useThemeColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, TouchableOpacity } from "react-native";

export default function OptionsScreen() {
  const [excludeCharacterDrops, setExcludeCharacterDrops] = useState(false);
  const [excludeTechDrops, setExcludeTechDrops] = useState(false);
  const currentTheme = useCurrentTheme();
  const isDarkTheme = currentTheme === "dark";

  // Get theme colors
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");

  // Load saved preferences
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const characterDrops = await AsyncStorage.getItem(
        "excludeCharacterDrops"
      );
      const techDrops = await AsyncStorage.getItem("excludeTechDrops");

      if (characterDrops !== null) {
        setExcludeCharacterDrops(JSON.parse(characterDrops));
      }
      if (techDrops !== null) {
        setExcludeTechDrops(JSON.parse(techDrops));
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    }
  };

  const savePreference = async (key: string, value: boolean) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving preference:", error);
    }
  };

  const toggleCharacterDrops = () => {
    const newValue = !excludeCharacterDrops;
    setExcludeCharacterDrops(newValue);
    savePreference("excludeCharacterDrops", newValue);
  };

  const toggleTechDrops = () => {
    const newValue = !excludeTechDrops;
    setExcludeTechDrops(newValue);
    savePreference("excludeTechDrops", newValue);
  };

  const toggleTheme = async () => {
    const newIsDark = !isDarkTheme;
    const newTheme = newIsDark ? "dark" : "light";

    try {
      await AsyncStorage.setItem("isDarkTheme", JSON.stringify(newIsDark));
      updateGlobalTheme(newTheme);
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    headerImage: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    title: {
      fontSize: 32,
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 32,
      opacity: 0.8,
    },
    section: {
      marginBottom: 32,
      backgroundColor: isDarkTheme
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.05)",
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: isDarkTheme
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)",
    },
    sectionTitle: {
      fontSize: 22,
      marginBottom: 8,
      color: tintColor,
    },
    sectionDescription: {
      fontSize: 14,
      marginBottom: 20,
      opacity: 0.7,
      color: textColor,
    },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
      paddingInline: 16,
      paddingVertical: 8,
    },
    optionInfo: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      marginRight: 16,
    },
    optionIcon: {
      marginRight: 16,
    },
    optionText: {
      flex: 1,
    },
    optionDescription: {
      fontSize: 14,
      opacity: 0.7,
      marginTop: 2,
      color: textColor,
    },
    resetButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 107, 107, 0.1)",
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: "rgba(255, 107, 107, 0.3)",
    },
    resetButtonText: {
      color: "#FF6B6B",
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
    infoSection: {
      backgroundColor: isDarkTheme
        ? "rgba(78, 205, 196, 0.1)"
        : "rgba(78, 205, 196, 0.2)",
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: "rgba(78, 205, 196, 0.3)",
    },
    infoTitle: {
      fontSize: 18,
      marginBottom: 12,
      color: "#4ECDC4",
    },
    infoText: {
      fontSize: 14,
      marginBottom: 6,
      marginLeft: 8,
      opacity: 0.8,
      color: textColor,
    },
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Options
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Customize your experience
        </ThemedText>

        {/* Theme Settings */}
        <ThemedView
          style={styles.section}
          lightColor="rgba(0, 0, 0, 0.03)"
          darkColor="rgba(255, 255, 255, 0.05)"
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Appearance
          </ThemedText>

          <ThemedView
            style={styles.optionRow}
            lightColor="transparent"
            darkColor="transparent"
          >
            <ThemedView
              style={styles.optionInfo}
              lightColor="transparent"
              darkColor="transparent"
            >
              <IconSymbol
                name="paintbrush.fill"
                size={24}
                color={tintColor}
                style={styles.optionIcon}
              />
              <ThemedView
                style={styles.optionText}
                lightColor="transparent"
                darkColor="transparent"
              >
                <ThemedText type="defaultSemiBold">Dark Theme</ThemedText>
                <ThemedText style={styles.optionDescription}>
                  Switch between light and dark modes
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <Switch
              value={isDarkTheme}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: tintColor }}
              thumbColor={isDarkTheme ? "#6200EE" : "#f4f3f4"}
            />
          </ThemedView>
        </ThemedView>

        {/* Drop Filtering Settings */}
        <ThemedView
          style={styles.section}
          lightColor="rgba(0, 0, 0, 0.03)"
          darkColor="rgba(255, 255, 255, 0.05)"
        >
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Drop Filters
          </ThemedText>
          <ThemedText style={styles.sectionDescription}>
            Exclude specific types of drops from your results
          </ThemedText>

          {/* Character Drops Filter */}
          <ThemedView
            style={styles.optionRow}
            lightColor="transparent"
            darkColor="transparent"
          >
            <ThemedView
              style={styles.optionInfo}
              lightColor="transparent"
              darkColor="transparent"
            >
              <IconSymbol
                name="person.fill"
                size={24}
                color={excludeCharacterDrops ? "#FF6B6B" : "#4ECDC4"}
                style={styles.optionIcon}
              />
              <ThemedView
                style={styles.optionText}
                lightColor="transparent"
                darkColor="transparent"
              >
                <ThemedText type="defaultSemiBold">
                  Exclude Character Drops
                </ThemedText>
                <ThemedText style={styles.optionDescription}>
                  Hide items starting with #(Character)
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <Switch
              value={excludeCharacterDrops}
              onValueChange={toggleCharacterDrops}
              trackColor={{ false: "#767577", true: "#FF6B6B" }}
              thumbColor={excludeCharacterDrops ? "#FF4757" : "#f4f3f4"}
            />
          </ThemedView>

          {/* Tech Drops Filter */}
          <ThemedView
            style={styles.optionRow}
            lightColor="transparent"
            darkColor="transparent"
          >
            <ThemedView
              style={styles.optionInfo}
              lightColor="transparent"
              darkColor="transparent"
            >
              <IconSymbol
                name="gear.fill"
                size={24}
                color={excludeTechDrops ? "#FF6B6B" : "#4ECDC4"}
                style={styles.optionIcon}
              />
              <ThemedView
                style={styles.optionText}
                lightColor="transparent"
                darkColor="transparent"
              >
                <ThemedText type="defaultSemiBold">
                  Exclude Tech Drops
                </ThemedText>
                <ThemedText style={styles.optionDescription}>
                  Hide items starting with #(Tech)
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <Switch
              value={excludeTechDrops}
              onValueChange={toggleTechDrops}
              trackColor={{ false: "#767577", true: "#FF6B6B" }}
              thumbColor={excludeTechDrops ? "#FF4757" : "#f4f3f4"}
            />
          </ThemedView>
        </ThemedView>

        {/* Reset Settings */}
        <ThemedView
          style={styles.section}
          lightColor="rgba(0, 0, 0, 0.03)"
          darkColor="rgba(255, 255, 255, 0.05)"
        >
          <TouchableOpacity
            style={styles.resetButton}
            onPress={async () => {
              setExcludeCharacterDrops(false);
              setExcludeTechDrops(false);
              await AsyncStorage.multiRemove([
                "excludeCharacterDrops",
                "excludeTechDrops",
              ]);
              // Reset theme to dark (default)
              await AsyncStorage.setItem("isDarkTheme", JSON.stringify(true));
              updateGlobalTheme("dark");
            }}
          >
            <IconSymbol name="arrow.clockwise" size={20} color="#FF6B6B" />
            <ThemedText style={styles.resetButtonText}>
              Reset to Defaults
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Info Section */}
        <ThemedView
          style={styles.infoSection}
          lightColor="rgba(78, 205, 196, 0.15)"
          darkColor="rgba(78, 205, 196, 0.1)"
        >
          <ThemedText type="defaultSemiBold" style={styles.infoTitle}>
            About Filters
          </ThemedText>
          <ThemedText style={styles.infoText}>
            • Character drops are items with descriptions starting with
            "#(Character)"
          </ThemedText>
          <ThemedText style={styles.infoText}>
            • Tech drops are items with descriptions starting with "#(Tech)"
          </ThemedText>
          <ThemedText style={styles.infoText}>
            • These settings will affect all future drops and searches
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}
