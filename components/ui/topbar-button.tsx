import { appColors } from "@/constants/colors";
import { SymbolViewProps } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { IconSymbol } from "./icon-symbol";
import AppText from "./text";

interface TopBarButtonProps {
  iconName?: SymbolViewProps["name"];
  text?: string;
  actionType?: "primary" | "secondary";
  action: () => void;
}

export default function TopBarButton({
  iconName,
  action,
  text,
  actionType = "secondary",
}: TopBarButtonProps) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor:
            actionType === "primary" ? appColors.primary : appColors.surface,
        },
      ]}
      onPress={action}
    >
      {iconName && <IconSymbol
        name={iconName}
        size={24}
        color={
          actionType === "primary" ? appColors.background : appColors.onSurface
        }
      />}
      {text && <AppText bold fontColor={appColors.onSurface}>{text}</AppText>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
});
