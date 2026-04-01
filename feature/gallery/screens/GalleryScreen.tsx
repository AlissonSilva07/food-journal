import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppText } from "@/core/components/ui/app-text";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { RootTabParamList } from "@/navigation/Navigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
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

  const { mealsList, selectedMeal, shareImage } = useGallery();

  const textPrimary = useThemeColor({}, "text");

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
            trailing={
              selectedMeal.value.imageUri !== null
                ? {
                    iconName: "square.and.arrow.up",
                    action: () => shareImage(selectedMeal.value?.imageUri!),
                  }
                : undefined
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
});
