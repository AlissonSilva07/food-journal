import { useThemeColor } from "@/core/hooks/use-theme-color";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const backgroundColor = useThemeColor({}, "background");
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {children}
      <StatusBar animated style={isDarkTheme ? "light" : "dark" } />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
