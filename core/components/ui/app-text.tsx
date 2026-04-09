import React from "react";
import { ColorValue, Text, TextProps, TextStyle } from "react-native";

interface AppTextProps extends TextProps {
  children?: React.ReactNode;
  fontFamily?: "display" | "body";
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  bold?: boolean;
  fontColor?: ColorValue;
  alignment?: TextStyle["textAlign"];
}

export function AppText({
  children,
  fontFamily = "body",
  fontColor = "#000000",
  fontSize = "md",
  bold = false,
  alignment = "auto",
  ...rest
}: AppTextProps) {
  const getStyle = () => {
    if (fontFamily === "display") return "BricolageGrotesque";
    if (fontFamily === "body" && bold === true) return "GeistBold";
    if (fontFamily === "body" && bold === false) return "GeistRegular";

    return "Geist";
  };
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
          fontFamily: getStyle(),
          fontSize: getFontSizeSize(),
          color: fontColor,
          textAlign: alignment,
        },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
