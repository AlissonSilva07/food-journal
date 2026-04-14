import { useThemeColor } from "@/core/hooks/use-theme-color";
import React, { JSX } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./app-text";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  image: JSX.Element | null;
  callback: () => void;
}

export function EmptyState({
  title,
  subtitle,
  image,
  callback,
}: EmptyStateProps) {
  const primary = useThemeColor({}, "primary");
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");

  return (
    <View style={styles.emptyContent}>
      {image}
      <AppText fontFamily="display" fontSize="xl" fontColor={textPrimary}>
        {title}
      </AppText>
      <AppText fontFamily="body" fontSize="md" fontColor={textSecondary}>
        {subtitle}
      </AppText>
      <Pressable onPress={callback}>
        <AppText fontFamily="body" fontSize="md" bold fontColor={primary}>
          Adicionar
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
