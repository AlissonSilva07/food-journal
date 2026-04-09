import { MainLayout } from "@/core/components/layout/MainLayout";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { IconSymbol } from "@/core/components/ui/icon-symbol";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { useUserStore } from "@/core/store/user.store";
import { HomeSection } from "@/feature/home/components/HomeSection";
import { useHome } from "@/feature/home/hooks/useHome";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Paths } from "expo-file-system/next";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { RootTabParamList } from "../../../navigation/Navigator";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const textPrimary = useThemeColor({}, "text");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");

  const { todayMealsList } = useHome();
  const { isLoading, user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);

  const renderAvatar = () => {
    if (isLoading) {
      return (
        <View
          style={[
            styles.topButton,
            {
              backgroundColor: surface,
            },
          ]}
        >
          <ActivityIndicator size={24} color={onSurface} />
        </View>
      );
    }

    if (!isLoading && user?.avatar) {
      const itemImageUri = `${Paths.document.uri}/${user.avatar}`;

      return <Image source={{ uri: itemImageUri }} style={styles.topImage} />;
    }

    return (
      <View
        style={[
          styles.topButton,
          {
            backgroundColor: surface,
          },
        ]}
      >
        <IconSymbol name="person.fill" size={24} color={onSurface} />
      </View>
    );
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <AppTopBar
          center={renderAvatar()}
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
        <HomeSection title={`Olá, ${user?.name}`} meals={todayMealsList} />
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
  topButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    overflow: "hidden",
  },
  topImage: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    resizeMode: "cover",
  },
});
