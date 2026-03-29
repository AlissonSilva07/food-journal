import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { TopBarButton, TopBarButtonProps } from "./topbar-button";

interface AppTopBarProps {
  leading?: TopBarButtonProps;
  center?: ReactNode;
  trailing?: TopBarButtonProps;
}

export default function AppTopBar({
  leading,
  center,
  trailing,
}: AppTopBarProps) {
  const hasMoreThanOneItem = leading || center || trailing;
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: hasMoreThanOneItem ? "space-between" : "flex-start",
        },
      ]}
    >
      {leading && (
        <TopBarButton
          iconName={leading.iconName}
          text={leading.text}
          actionType={leading.actionType}
          action={leading.action}
        />
      )}
      {center && center}
      {trailing && (
        <TopBarButton
          iconName={trailing.iconName}
          text={trailing.text}
          actionType={trailing.actionType}
          action={trailing.action}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
