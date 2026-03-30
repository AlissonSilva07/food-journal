/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#000000",
    textSecondary: "#ADADAD",
    background: "#FFFFFF",
    inverseBackground: "#000000",
    primary: "#C71585",
    onPrimary: "#FFFFFF",
    secondary: "#fa55be",
    surface: "#f5f5f7",
    onSurface: "#000000",
    success: "#28a745",
    error: "#FF0000",
    outline: "#E6E6E6",
    cameraButtonRing: "rgba(0, 0, 0, 0.2)",
    tabBar: "rgba(0,0,0,0.1)",
  },
  dark: {
    text: "#FFFFFF",
    textSecondary: "#707070",
    background: "#000000",
    inverseBackground: "#FFFFFF",
    primary: "#CEFF00",
    onPrimary: "#000000",
    secondary: "#eaff95",
    surface: "#141414",
    onSurface: "#FFFFFF",
    success: "#28a745",
    error: "#FF0000",
    outline: "#1A1A1A",
    cameraButtonRing: "rgba(0, 0, 0, 0.2)",
    tabBar: "rgba(255,255,255,0.1)",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Assets = {
  light: {
    logo: "@/assets/images/logo-light-minimal.png",
  },
  dark: {
    logo: "@/assets/images/logo-dark-minimal.png",
  },
};
