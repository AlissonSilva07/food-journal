import { MainLayout } from "@/core/components/layout/MainLayout";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { HomeSection } from "@/features/home/components/HomeSection";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import React from "react";
import { Image, StyleSheet, useColorScheme, View } from "react-native";
import { RootTabParamList } from "./Navigator";
import { useHome } from "@/features/home/hooks/useHome";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const [assets, error] = useAssets([
    require("../assets/images/logo-light-minimal.png"),
    require("../assets/images/logo-dark-minimal.png"),
  ]);

  const { mealsList } = useHome();

  const renderAsset = () => {
    if (assets && assets.length > 0) {
      if (isDarkTheme) {
        return <Image source={{ uri: assets[1].uri }} style={styles.headerImage} />;
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
        <AppTopBar
          leading={{
            iconName: "magnifyingglass",
            action: () => {},
          }}
          center={renderAsset()}
          trailing={{
            iconName: "plus",
            actionType: "primary",
            action: () => {
              navigation.navigate("Home", {
                screen: "New",
              });
            },
          }}
        />
        <View style={styles.spacer} />
        <HomeSection meals={mealsList} />
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
