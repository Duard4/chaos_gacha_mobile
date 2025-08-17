// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = {
  [K in string]: ComponentProps<typeof MaterialIcons>["name"];
};

const MAPPING = {
  book: "book",
  "hammer.fill": "build",
  "inbox.right": "inbox",
  // Options screen icons
  "paintbrush.fill": "palette",
  "person.fill": "person",
  "gear.fill": "settings",
  "arrow.clockwise": "refresh",
  "line.horizontal.3.decrease.circle": "filter-list",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
} as const;

type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
