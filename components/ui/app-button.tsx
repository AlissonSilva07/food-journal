import { appColors } from "@/constants/colors";
import React from "react";
import {
  ActivityIndicator,
  ColorValue,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";
import AppText from "./text";

export type AppButtonVariant = "default" | "muted" | "disabled" | "loading";

interface ButtonColors {
  bg?: ColorValue;
  text?: ColorValue;
  stroke?: ColorValue;
}

interface AppButtonProps extends PressableProps {
  title: string;
  variant?: AppButtonVariant;
}

export function AppButton({
  title,
  variant = "default",
  ...rest
}: AppButtonProps) {
  const getButtonColors = () => {
    let colors: ButtonColors = {};

    switch (variant) {
      case "default":
        colors = {
          bg: appColors.primary,
          text: appColors.background,
        };
        break;
      case "muted":
        colors = {
          bg: "transparent",
          text: appColors.primary,
        };
        break;
      case "disabled":
        colors = {
          bg: appColors.surface,
          text: appColors.background,
        };
        break;
      case "loading":
        colors = {
          bg: appColors.primary,
          text: appColors.background,
        };
        break;
      default:
        colors = {
          bg: appColors.primary,
          text: appColors.background,
        };
        break;
    }

    return colors;
  };

  return (
    <Pressable
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor: getButtonColors().bg,
          borderWidth: 1,
          borderColor:
            variant === "muted"
              ? getButtonColors().stroke
              : getButtonColors().bg,
        },
      ]}
    >
      {variant === "loading" && (
        <ActivityIndicator size={16} color={getButtonColors().text} />
      )}
      <AppText fontColor={getButtonColors().text} bold>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 100,
  },
});
