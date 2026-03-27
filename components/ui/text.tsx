import { appColors } from "@/constants/colors";
import React from "react";
import { ColorValue, Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  children: string;
  fontFamily?: "display" | "body";
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  bold?: boolean;
  fontColor?: ColorValue;
}

export default function AppText({
  children,
  fontFamily = "body",
  fontColor = appColors.onBackground,
  fontSize = "md",
  bold = false,
  ...rest
}: AppTextProps) {
  const style = fontFamily === "display" ? "BricolageGrotesque" : "Geist";
  const getFontSizeSize = () => {
    switch (fontSize) {
      case "xs":
        return 10;
      case "sm":
        return 12;
      case "md":
        return 16;
      case "lg":
        return 20;
      case "xl":
        return 24;
      case "2xl":
        return 32;
      default:
        return 16;
    }
  };
  return (
    <Text
      style={[
        {
          fontFamily: style,
          fontSize: getFontSizeSize(),
          color: fontColor,
          fontWeight: bold ? "700" : undefined,
        },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
