import { appColors } from "@/constants/colors";
import { SymbolViewProps } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { IconSymbol } from "./icon-symbol";

interface TopBarButtonProps {
  iconName: SymbolViewProps["name"];
  action: () => void;
}

export default function TopBarButton({ iconName, action }: TopBarButtonProps) {
  return (
    <Pressable style={styles.container} onPress={action}>
      <IconSymbol name={iconName} size={24} color={appColors.onSurface} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColors.surface,
    borderRadius: 16,
  },
});
