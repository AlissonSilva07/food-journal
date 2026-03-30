import AppTopBar from "@/core/components/ui/app-top-bar";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import MealCameraTab from "@/feature/home/components/MealCameraTab";
import MealInfoTab from "@/feature/home/components/MealInfoTab";
import MealIngredientsTab from "@/feature/home/components/MealIngredientsScreen";
import { useNewMeal } from "@/feature/home/hooks/useNewMeal";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { usePagerView } from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootTabParamList } from "./Navigator";

export default function NewMealScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  const background = useThemeColor({}, "background");

  const { AnimatedPagerView, ref, activePage, setPage, onPageSelected } =
    usePagerView({
      pagesAmount: 3,
    });

  const {
    title,
    description,
    mealtype,
    getMealTypeTitle,
    validateMealInfo,
    imageUri,
    inputText,
    ingredients,
    saveMeal,
  } = useNewMeal();

  const goToNextPage = () => {
    if (activePage < 2) {
      setPage(activePage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (activePage > 0) {
      setPage(activePage - 1);
    }
  };

  const proceedToCamera = () => {
    const validation = validateMealInfo();

    if (validation === true) {
      goToNextPage();
    }
  };

  const saveAndGoBack = async () => {
    await saveMeal();
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  const renderTopBar = () => {
    switch (activePage) {
      case 0:
        return (
          <AppTopBar
            leading={{
              iconName: "xmark",
              action: navigation.goBack,
            }}
            trailing={{
              text: "Próximo",
              action: proceedToCamera,
            }}
          />
        );
      case 1:
        return (
          <AppTopBar
            leading={{
              iconName: "arrow.backward",
              action: goToPreviousPage,
            }}
            trailing={{
              text: "Pular",
              action: goToNextPage,
            }}
          />
        );
      case 2:
        return (
          <AppTopBar
            leading={{
              iconName: "arrow.backward",
              action: goToPreviousPage,
            }}
            trailing={{
              text: "Salvar",
              actionType: "primary",
              action: saveAndGoBack,
            }}
          />
        );
      default:
        return (
          <AppTopBar
            leading={{
              iconName: "xmark",
              action: () => navigation.goBack,
            }}
          />
        );
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.select({
            ios: 0,
            android: insets.top,
          }),
          backgroundColor: background,
        },
      ]}
    >
      {renderTopBar()}
      <View style={styles.spacer} />
      <AnimatedPagerView
        ref={ref}
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={false}
        onPageSelected={onPageSelected}
      >
        <MealInfoTab
          key={0}
          title={title}
          description={description}
          mealtype={mealtype}
          getMealTypeTitle={getMealTypeTitle}
        />
        <MealCameraTab key={1} imageUri={imageUri} onContinue={goToNextPage} />
        <MealIngredientsTab
          key={2}
          inputText={inputText}
          ingredients={ingredients}
        />
      </AnimatedPagerView>
    </View>
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
  headerImage: {
    height: 42,
    width: 200,
    resizeMode: "contain",
  },
  pagerView: {
    flex: 1,
  },
});
