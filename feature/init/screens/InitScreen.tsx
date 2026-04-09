import { MainLayout } from "@/core/components/layout/MainLayout";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { useUserStore } from "@/core/store/user.store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

export default function InitScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const primary = useThemeColor({}, "primary");

  const { fetchUser } = useUserStore();

  useEffect(() => {
    async function bootstrap() {
      await fetchUser();

      const { hasOnboarded } = useUserStore.getState();

      if (hasOnboarded) {
        navigation.navigate("Main", {
          screen: "Home",
        });
      } else {
        navigation.navigate("Onboarding");
      }
    }

    bootstrap();
  }, []);

  return (
    <MainLayout>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
