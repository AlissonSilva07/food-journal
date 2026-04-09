import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppText } from "@/core/components/ui/app-text";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { HomeSection } from "@/feature/home/components/HomeSection";
import { useHome } from "@/feature/home/hooks/useHome";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { RootTabParamList } from "../../../navigation/Navigator";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const textPrimary = useThemeColor({}, "text");

  const { todayMealsList } = useHome();

  return (
    <MainLayout>
      <View style={styles.container}>
        <AppTopBar
          leading={{
            iconName: "magnifyingglass",
            action: () => {},
          }}
          center={
            <AppText fontFamily="display" fontSize="md" fontColor={textPrimary}>
              Piggy Journal
            </AppText>
          }
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
        <HomeSection meals={todayMealsList} />
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
    height: 28,
    width: 120,
    resizeMode: "contain",
  },
  body: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
});
