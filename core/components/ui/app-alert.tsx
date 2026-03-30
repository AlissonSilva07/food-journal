import { useThemeColor } from "@/core/hooks/use-theme-color";
import React, { useEffect } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AppText } from "./app-text";

type AlertBottomButton = {
  title: string;
  action: () => void;
};

type AppAlertProps = {
  title: string;
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  positiveButton?: AlertBottomButton;
  negativeButton?: AlertBottomButton;
};

export function AppAlert({
  title,
  children,
  visible,
  onClose,
  positiveButton,
  negativeButton,
}: AppAlertProps) {
  const opacity = useSharedValue(0);
  const [modalVisible, setModalVisible] = React.useState(false);

  const background = useThemeColor({}, "background");
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const primary = useThemeColor({}, "primary");
  const secondary = useThemeColor({}, "secondary");

  const outline = useThemeColor({}, "outline");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      opacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.ease,
      });
    } else {
      opacity.value = withTiming(
        0,
        {
          duration: 200,
          easing: Easing.ease,
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(setModalVisible)(false);
          }
        },
      );
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Animated.View style={[styles.modalBackground, animatedStyle]}>
        <Pressable style={styles.modalBackgroundPressable} onPress={onClose} />
        <View style={[styles.modalContent, { backgroundColor: surface }]}>
          <AppText fontFamily="display" fontSize="xl" fontColor={textPrimary}>
            {title}
          </AppText>
          {children}
          <View style={styles.bottomButtons}>
            {positiveButton && (
              <Pressable
                style={styles.bottomButton}
                onPress={positiveButton.action}
              >
                <AppText bold fontColor={secondary}>
                  {positiveButton.title}
                </AppText>
              </Pressable>
            )}
            <View />
            {negativeButton && (
              <Pressable
                style={styles.bottomButton}
                onPress={negativeButton.action}
              >
                <AppText bold fontColor={secondary}>
                  {negativeButton.title}
                </AppText>
              </Pressable>
            )}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBackgroundPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: "88%",
    flexDirection: "column",
    gap: 16,
    padding: 16,
    borderRadius: 16,
  },
  modalTopContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
  },
});
