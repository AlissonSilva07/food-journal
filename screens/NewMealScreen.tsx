import { MainLayout } from "@/core/components/layout/MainLayout";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import MealCameraTab from "@/features/home/components/MealCameraTab";
import MealInfoTab from "@/features/home/components/MealInfoTab";
import MealIngredientsTab from "@/features/home/components/MealIngredientsScreen";
import { useNewMeal } from "@/features/home/hooks/useNewMeal";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { usePagerView } from "react-native-pager-view";
import { RootTabParamList } from "./Navigator";

export default function NewMealScreen() {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const textPrimary = useThemeColor({}, "text");

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
              action: goToNextPage,
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
    <MainLayout>
      <View style={styles.container}>
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
          <MealCameraTab
            key={1}
            imageUri={imageUri}
            onContinue={goToNextPage}
          />
          <MealIngredientsTab
            key={2}
            inputText={inputText}
            ingredients={ingredients}
          />
        </AnimatedPagerView>
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
