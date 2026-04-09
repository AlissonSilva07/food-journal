import { AppButton } from "@/core/components/ui/app-button";
import { AppText } from "@/core/components/ui/app-text";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { useAssets } from "expo-asset";
import {
  Dimensions,
  Image,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export function OnboardingCreateMealTab({ key }: { key: number }) {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const textPrimary = useThemeColor({}, "text");

  const screenHeight = Dimensions.get("screen").height;

  const [assets, error] = useAssets([
    require("@/assets/images/frame-create-dark.png"),
    require("@/assets/images/frame-create-light.png"),
  ]);

  const renderImageAsset = () => {
    if (assets && assets.length > 0) {
      if (isDarkTheme) {
        return (
          <Animated.Image
            entering={FadeIn.delay(500)}
            source={{ uri: assets[0].uri }}
            style={{
              width: "100%",
              height: screenHeight / 1.8,
              resizeMode: "contain",
            }}
          />
        );
      } else {
        return (
          <Animated.Image
            entering={FadeIn.delay(500)}
            source={{ uri: assets[1].uri }}
            style={{
              width: "100%",
              height: screenHeight / 1.8,
              resizeMode: "contain",
            }}
          />
        );
      }
    }

    return null;
  };

  return (
    <View key={key} style={styles.tabContainer}>
      <View style={styles.tabBody}>
        <Animated.Text entering={FadeIn.delay(250)}>
          <AppText
            fontFamily="display"
            fontSize="2xl"
            fontColor={textPrimary}
            alignment="center"
          >
            Registre suas refeições diárias
          </AppText>
        </Animated.Text>
        {renderImageAsset()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
    gap: 16,
  },
  tabBody: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
});
