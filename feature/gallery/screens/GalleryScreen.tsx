import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppText } from "@/core/components/ui/app-text";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { IconSymbol } from "@/core/components/ui/icon-symbol";
import { useShare } from "@/core/hooks/use-share";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { RootTabParamList } from "@/navigation/Navigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";
import { GridView } from "../components/GridView";
import { useGallery } from "../hooks/useGallery";

export default function GalleryScreen() {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  const { mealsList, selectedMeal } = useGallery();
  const { isLoading, shareImage } = useShare();

  const textPrimary = useThemeColor({}, "text");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");

  const renderTopBar = () => {
    if (selectedMeal.value) {
      return (
        <Animated.View
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(250)}
        >
          <AppTopBar
            leading={{
              iconName: "xmark",
              action: () => selectedMeal.setValue(null),
            }}
            center={
              <View style={styles.titleContainer}>
                <AppText
                  fontSize="md"
                  fontColor={textPrimary}
                  bold
                  numberOfLines={1}
                >
                  {selectedMeal.value.title}
                </AppText>
              </View>
            }
            trailingItem={
              selectedMeal.value.imageUri !== null ? (
                <Pressable
                  disabled={isLoading}
                  onPress={() => shareImage(selectedMeal.value?.imageUri!)}
                  style={[
                    styles.topButton,
                    {
                      backgroundColor: surface,
                    },
                  ]}
                >
                  {isLoading ? (
                    <ActivityIndicator size={24} color={onSurface} />
                  ) : (
                    <IconSymbol
                      name="square.and.arrow.up"
                      size={24}
                      color={onSurface}
                    />
                  )}
                </Pressable>
              ) : undefined
            }
          />
        </Animated.View>
      );
    }

    return (
      <AppTopBar
        leading={{
          iconName: "arrow.backward",
          action: navigation.goBack,
        }}
        trailing={{
          iconName: "magnifyingglass",
          action: () => {},
        }}
      />
    );
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        {renderTopBar()}
        <View style={styles.spacer} />
        <Animated.View
          entering={FadeInDown.duration(250)}
          exiting={FadeOutDown.duration(250)}
          style={{
            flex: 1,
          }}
        >
          <GridView mealsHistory={mealsList} selectedMeal={selectedMeal} />
        </Animated.View>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spacer: {
    height: 16,
  },
  titleContainer: {
    maxWidth: "40%",
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
  },
  topButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
});
