import { useThemeColor } from "@/core/hooks/use-theme-color";
import { ToastData, ToastType, useToastStore } from "@/core/store/toast.store";
import { SymbolViewProps } from "expo-symbols";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AppText } from "./app-text";
import { IconSymbol } from "./icon-symbol";

export function AppToast() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {toasts.map((toast) => (
        <AnimatedToast key={toast.id} toast={toast} />
      ))}
    </View>
  );
}

function AnimatedToast({ toast }: { toast: ToastData }) {
  const textPrimary = useThemeColor({}, "text");
  const surface = useThemeColor({}, "surface");
  const outline = useThemeColor({}, "outline");

  const color = toastTypeColor[toast.type || "info"];

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[
        styles.toast,
        {
          backgroundColor: surface,
          borderWidth: 1,
          borderColor: outline,
        },
      ]}
    >
      <IconSymbol
        name={toastIcon[toast.type || "info"]}
        size={22}
        color={color}
        style={{ marginRight: 12 }}
      />

      <AppText fontColor={textPrimary}>{toast.message}</AppText>
    </Animated.View>
  );
}

const toastTypeColor = {
  success: "#28a745",
  error: "#dc3545",
  warning: "#f0ad4e",
  info: "#17a2b8",
};

const toastIcon: Record<ToastType, SymbolViewProps["name"]> = {
  success: "checkmark.circle.fill",
  error: "xmark.circle.fill",
  warning: "exclamationmark.triangle.fill",
  info: "info.circle.fill",
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 64,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  text: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "500",
  },
});
