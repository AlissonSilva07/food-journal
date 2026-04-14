import { AppText } from "@/core/components/ui/app-text";
import { IconSymbol } from "@/core/components/ui/icon-symbol";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { SymbolViewProps } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { PressableProps } from "react-native-gesture-handler";

interface MenuItemProps extends PressableProps {
  title: string;
  icon: SymbolViewProps["name"];
  onPress: () => void;
}

export function MenuItem({ title, icon, onPress }: MenuItemProps) {
  const surface = useThemeColor({}, "surface");
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");

  return (
    <Pressable style={styles.item} onPress={onPress}>
      <View
        style={[
          styles.iconBg,
          {
            backgroundColor: surface,
          },
        ]}
      >
        <IconSymbol name={icon} size={20} color={textPrimary} />
      </View>
      <AppText fontSize="md" fontColor={textPrimary} bold>
        {title}
      </AppText>
      <View style={{ flex: 1 }} />
      <IconSymbol name="chevron.right" size={20} color={textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconBg: {
    padding: 8,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
