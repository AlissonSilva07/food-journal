import AppText from "@/components/ui/text";
import TopBarButton from "@/components/ui/topbar-button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootTabParamList } from "./Navigator";

export default function MealIngredientsScreen() {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.select({
            ios: 0,
            android: insets.top,
          }),
        },
      ]}
    >
      <View style={styles.header}>
        <TopBarButton iconName="arrow.backward" action={navigation.goBack} />
      </View>
      <View style={styles.spacer} />
      <View style={styles.body}>
        <AppText fontFamily="display" fontSize="2xl">
          Ingredientes
        </AppText>
      </View>
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
  body: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
});
