import { useThemeColor } from "@/core/hooks/use-theme-color";
import { SymbolViewProps } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { AppText } from "./app-text";
import { IconSymbol } from "./icon-symbol";

export interface TopBarButtonProps {
  iconName?: SymbolViewProps["name"];
  text?: string;
  actionType?: "primary" | "secondary";
  action: () => void;
}

export function TopBarButton({
  iconName,
  action,
  text,
  actionType = "secondary"
}: TopBarButtonProps) {
  const background = useThemeColor({}, "primary");
  const foreground = useThemeColor({}, "onPrimary");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: actionType === "primary" ? background : surface,
        },
      ]}
      onPress={action}
    >
      {iconName && (
        <IconSymbol
          name={iconName}
          size={24}
          color={actionType === "primary" ? foreground : onSurface}
        />
      )}
      {text && (
        <AppText
          bold
          fontColor={actionType === "primary" ? foreground : onSurface}
        >
          {text}
        </AppText>
      )}
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
