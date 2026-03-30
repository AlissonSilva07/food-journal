import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface AppFlowRowProps {
  children: ReactNode;
  style: StyleProp<ViewStyle>;
}

export function AppFlowRow({ children, style }: AppFlowRowProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
