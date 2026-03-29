import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppText } from "@/core/components/ui/app-text";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function GalleryScreen() {
  const textPrimary = useThemeColor({}, "text");
  return (
    <MainLayout>
      <View style={styles.container}>
        <AppTopBar
          leading={{
            iconName: "arrow.backward",
            action: () => {},
          }}
          trailing={{
            iconName: "magnifyingglass",
            action: () => {},
          }}
        />
        <View style={styles.spacer} />
        <View style={styles.body}>
          <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
            Galeria
          </AppText>
        </View>
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
