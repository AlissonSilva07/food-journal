import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppAlert } from "@/core/components/ui/app-alert";
import { AppButton } from "@/core/components/ui/app-button";
import { AppFlowRow } from "@/core/components/ui/app-flow-row";
import { AppText } from "@/core/components/ui/app-text";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { MealWithIngredients } from "@/core/db/schema";
import { useShare } from "@/core/hooks/use-share";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { useMealStore } from "@/core/store/meals.store";
import { MealEntryType } from "@/feature/home/types/meal.types";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import * as Haptics from "expo-haptics";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  HomeStackParamList,
  RootTabParamList,
} from "../../../navigation/Navigator";
import { Paths } from "expo-file-system/next";

const screenHeight = Dimensions.get("screen").height;

export default function MealDetailsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  const route = useRoute<RouteProp<HomeStackParamList, "MealDetails">>();
  const { id } = route.params;

  const {
    isLoading: isLoadingMeals,
    fetchMealById,
    deleteMeal,
  } = useMealStore();
  const { isLoading: isLoadingShare, shareImage } = useShare();
  const [meal, setMeal] = useState<MealWithIngredients | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";

  const background = useThemeColor({}, "background");
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const primary = useThemeColor({}, "primary");
  const outline = useThemeColor({}, "outline");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");

  const [assets, error] = useAssets([
    require("@/assets/images/logo-light.png"),
    require("@/assets/images/logo-dark.png"),
  ]);

  const renderAsset = () => {
    if (assets && assets.length > 0) {
      if (isDarkTheme) {
        return (
          <Image source={{ uri: assets[1].uri }} style={styles.emptyImage} />
        );
      } else {
        return (
          <Image source={{ uri: assets[0].uri }} style={styles.emptyImage} />
        );
      }
    }

    return null;
  };

  const getMealType = (type: MealEntryType | undefined) => {
    if (!type) return null;

    let mealSection: string;

    switch (type) {
      case "BREAKFAST":
        mealSection = "CAFÉ DA MANHÃ";
        break;
      case "LUNCH":
        mealSection = "ALMOÇO";
        break;
      case "DINNER":
        mealSection = "JANTAR";
        break;
      case "SNACK":
        mealSection = "LANCHE";
        break;
      default:
        mealSection = "CAFÉ DA MANHÃ";
        break;
    }

    return mealSection;
  };

  const handleDelete = (id: number) => {
    deleteMeal(id);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (navigation.canGoBack()) {
      setIsDialogOpen(false);
      navigation.goBack();
    }
  };

  useEffect(() => {
    const fetchMeal = async () => {
      const result = await fetchMealById(id);
      if (!result) return;

      setMeal(result);
    };

    fetchMeal();
  }, [id]);

  const itemImageUri = `${Paths.document.uri}/${meal?.imageUri}`;

  if (!meal) return null;

  return (
    <MainLayout>
      <View
        style={[
          styles.container,
          {
            backgroundColor: background,
          },
        ]}
      >
        {isLoadingMeals ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={primary} />
          </View>
        ) : (
          <View style={styles.content}>
            <AppTopBar
              leading={{
                iconName: "arrow.backward",
                action: navigation.goBack,
              }}
              center={
                <View style={styles.titleContainer}>
                  {meal.title && (
                    <AppText
                      fontSize="md"
                      fontColor={textPrimary}
                      bold
                      numberOfLines={1}
                    >
                      {meal?.title}
                    </AppText>
                  )}
                  {meal.mealType && (
                    <AppText
                      fontSize="sm"
                      fontColor={textSecondary}
                      numberOfLines={1}
                    >
                      {getMealType(meal.mealType as MealEntryType) ?? ""}
                    </AppText>
                  )}
                </View>
              }
              trailing={{
                iconName: "trash",
                action: () => setIsDialogOpen(true),
              }}
            />
            <View style={styles.spacer} />
            <ScrollView
              style={styles.contentSpacing}
              contentContainerStyle={styles.contentSpacingScroll}
            >
              <View
                style={[
                  styles.image,
                  {
                    height: screenHeight / 2,
                    borderWidth: 1,
                    borderColor: outline,
                  },
                ]}
              >
                {meal.imageUri ? (
                  <Image source={{ uri: itemImageUri }} style={{ flex: 1 }} />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {renderAsset()}
                  </View>
                )}
              </View>
              {meal.description && (
                <View style={[styles.surfaceContainer]}>
                  <AppText fontSize="sm" fontColor={textSecondary} bold>
                    Descrição
                  </AppText>
                  <AppText fontColor={onSurface}>{meal?.description}</AppText>
                </View>
              )}
              {meal.ingredients && meal.ingredients.length > 0 && (
                <View style={styles.surfaceContainer}>
                  <AppText fontSize="sm" fontColor={textSecondary} bold>
                    Ingredientes
                  </AppText>
                  <AppFlowRow style={styles.flowContainer}>
                    {meal.ingredients.map((i) => (
                      <View
                        key={i.id}
                        style={[styles.flowItem, { backgroundColor: surface }]}
                      >
                        <AppText fontColor={onSurface} bold>
                          {i.name}
                        </AppText>
                      </View>
                    ))}
                  </AppFlowRow>
                </View>
              )}
            </ScrollView>
            <View
              style={{
                padding: 16,
              }}
            >
              <AppButton
                title="Compartilhar"
                disabled={isLoadingShare}
                variant={isLoadingShare ? "loading" : "default"}
                onPress={() => shareImage(meal.imageUri!)}
              />
            </View>
          </View>
        )}
      </View>

      <AppAlert
        title="Atenção"
        visible={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        positiveButton={{
          title: "Sim",
          action: () => handleDelete(id),
        }}
        negativeButton={{
          title: "Não",
          action: () => setIsDialogOpen(false),
        }}
      >
        <AppText fontColor={textPrimary}>
          Deseja realmente deletar este item?
        </AppText>
      </AppAlert>
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
  },
  spacer: {
    height: 16,
  },
  spacerFlex: {
    flex: 1,
  },
  titleContainer: {
    maxWidth: "40%",
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  contentSpacing: {
    flex: 1,
  },
  contentSpacingScroll: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  surfaceContainer: {
    flexDirection: "column",
    gap: 8,
  },
  image: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  emptyImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  flowContainer: {
    width: "100%",
    justifyContent: "flex-start",
  },
  flowItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
