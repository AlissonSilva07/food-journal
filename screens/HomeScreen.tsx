import { MainLayout } from "@/components/layout/MainLayout";
import { HomeSection } from "@/components/ui/home-section";
import TopBarButton from "@/components/ui/topbar-button";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <TopBarButton iconName="magnifyingglass" action={() => {}} />
          <Image
            source={require("@/assets/images/logo-dark-minimal.png")}
            style={styles.headerImage}
          />
          <TopBarButton iconName="plus" action={() => {}} />
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
