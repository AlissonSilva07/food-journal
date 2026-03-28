import { MainLayout } from "@/components/layout/MainLayout";
import { HomeSection } from "@/components/ui/home-section";
import { TopBarButton } from "@/components/ui/topbar-button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import React from "react";
import { Image, StyleSheet, useColorScheme, View } from "react-native";
import { RootTabParamList } from "./Navigator";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const [assets, error] = useAssets([
    require("../assets/images/logo-light-minimal.png"),
    require("../assets/images/logo-dark-minimal.png"),
  ]);

  const renderAsset = () => {
    if (assets && assets.length > 0) {
      if (isDarkTheme) {
        <Image source={{ uri: assets[1].uri }} style={styles.headerImage} />;
      } else {
        return (
          <Image source={{ uri: assets[0].uri }} style={styles.headerImage} />
        );
      }
    }

    return null;
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <TopBarButton iconName="magnifyingglass" action={() => {}} />
          {renderAsset()}
          <TopBarButton
            iconName="plus"
            actionType="primary"
            action={() => {
              navigation.navigate("Home", {
                screen: "New",
              });
            }}
          />
        </View>
        <View style={styles.spacer} />
        <HomeSection />
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
  headerImage: {
    height: 42,
    width: 200,
    resizeMode: "contain",
  },
  body: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
});
