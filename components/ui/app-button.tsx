import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import {
  ActivityIndicator,
  ColorValue,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";
import { AppText } from "./app-text";

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
  const background = useThemeColor({}, "primary");
  const foreground = useThemeColor({}, "onPrimary");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");

  const getButtonColors = () => {
    let colors: ButtonColors = {};

    switch (variant) {
      case "default":
        colors = {
          bg: background,
          text: foreground,
        };
        break;
      case "muted":
        colors = {
          bg: "transparent",
          text: background,
        };
        break;
      case "disabled":
        colors = {
          bg: surface,
          text: onSurface,
        };
        break;
      case "loading":
        colors = {
          bg: background,
          text: foreground,
        };
        break;
      default:
        colors = {
          bg: background,
          text: foreground,
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
