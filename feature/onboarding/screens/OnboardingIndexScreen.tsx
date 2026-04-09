import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppButton } from "@/core/components/ui/app-button";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import React from "react";
import { Image, StyleSheet, useColorScheme, View } from "react-native";
import { usePagerView } from "react-native-pager-view";
import { OnboardingStackParamList } from "../../../navigation/Navigator";
import { OnboardingCreateMealTab } from "../components/OnboardingCreateMealTab";
import { OnboardingDisplayMealTab } from "../components/OnboardingDisplayMealTab";
import { OnboardingShareMealTab } from "../components/OnboardingShareMealTab";

export default function OnboardingIndexScreen() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const navigation = useNavigation<NavigationProp<OnboardingStackParamList>>();
  const textPrimary = useThemeColor({}, "text");
  const surface = useThemeColor({}, "surface");

  const [assets, error] = useAssets([
    require("@/assets/images/logo-light.png"),
    require("@/assets/images/logo-dark.png"),
  ]);

  const { AnimatedPagerView, ref, activePage, setPage, onPageSelected, pages } =
    usePagerView({
      pagesAmount: 3,
    });

  const goToNextPage = () => {
    if (activePage < 2) {
      setPage(activePage + 1);
    } else {
      navigation.navigate("UserName");
    }
  };

  const renderLogoAsset = () => {
    if (assets && assets.length > 0) {
      if (isDarkTheme) {
        return (
          <Image
            source={{ uri: assets[1].uri }}
            style={{
              width: 42,
              height: 42,
              resizeMode: "contain",
            }}
          />
        );
      } else {
        return (
          <Image
            source={{ uri: assets[0].uri }}
            style={{
              width: 42,
              height: 42,
              resizeMode: "contain",
            }}
          />
        );
      }
    }

    return null;
  };

  const renderScrollIndicator = () => {
    return (
      <View style={styles.tabScrollIndicatorContainer}>
        {pages &&
          pages.map((indicator, index) => {
            const isActive = indicator === activePage;
            return (
              <View
                key={index}
                style={[
                  styles.tabScrollIndicator,
                  {
                    backgroundColor: isActive ? textPrimary : surface,
                    width: isActive ? 12 : 10,
                    height: isActive ? 12 : 10,
                  },
                ]}
              />
            );
          })}
      </View>
    );
  };

  return (
    <MainLayout>
      <View style={styles.tabHeader}>{renderLogoAsset()}</View>
      <AnimatedPagerView
        ref={ref}
        style={styles.container}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        <OnboardingCreateMealTab key={0} />
        <OnboardingShareMealTab key={1} />
        <OnboardingDisplayMealTab key={2} />
      </AnimatedPagerView>
      <View style={styles.tabFooter}>
        {renderScrollIndicator()}
        <AppButton
          title={activePage === 2 ? "Continuar" : "Próximo"}
          onPress={goToNextPage}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
    gap: 16,
  },
  tabHeader: {
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBody: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  tabScrollIndicator: {
    borderRadius: 100,
  },
  tabScrollIndicatorContainer: {
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  tabFooter: {
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 16,
  },
});
