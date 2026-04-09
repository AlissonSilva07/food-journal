import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppText } from "@/core/components/ui/app-text";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { IconSymbol } from "@/core/components/ui/icon-symbol";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { useUserStore } from "@/core/store/user.store";
import { Paths } from "expo-file-system/next";
import { useNavigation } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function MenuScreen() {
  const navigation = useNavigation();
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");
  const primary = useThemeColor({}, "primary");
  const outline = useThemeColor({}, "outline");

  const { isLoading, user } = useUserStore();

  const formattedDate = new Date(user?.createdAt!).toLocaleDateString();

  const renderAvatar = () => {
    if (isLoading) {
      return (
        <View
          style={[
            styles.topImage,
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
          styles.topImage,
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
          leading={{
            iconName: "arrow.backward",
            action: () => navigation.goBack(),
          }}
        />
        <View style={styles.spacer} />
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyScroll}
        >
          <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
            Menu
          </AppText>
          <View style={styles.header}>
            <View
              style={[
                styles.topImageRing,
                {
                  borderWidth: 2,
                  borderColor: primary,
                  borderStyle: "dashed",
                },
              ]}
            >
              {renderAvatar()}
            </View>
            <View style={styles.headerText}>
              <AppText fontSize="xl" fontColor={textPrimary} bold>
                {user?.name}
              </AppText>
              {formattedDate && (
                <AppText fontSize="sm" fontColor={textSecondary}>
                  PiggyJourner desde {formattedDate}
                </AppText>
              )}
            </View>
          </View>
          <View style={styles.spacer} />
          <AppText fontSize="sm" fontColor={textSecondary} bold>
            AÇÕES
          </AppText>
          <Pressable style={styles.item}>
            <View
              style={[
                styles.iconBg,
                {
                  backgroundColor: surface,
                },
              ]}
            >
              <IconSymbol
                name="person.crop.circle.fill"
                size={20}
                color={textPrimary}
              />
            </View>
            <AppText fontSize="md" fontColor={textPrimary} bold>
              Editar meu perfil
            </AppText>
            <View style={{ flex: 1 }} />
            <IconSymbol name="chevron.forward" size={20} color={textSecondary} />
          </Pressable>
          <View style={[styles.itemSeparator, { backgroundColor: outline }]} />
          <Pressable style={styles.item}>
            <View
              style={[
                styles.iconBg,
                {
                  backgroundColor: surface,
                },
              ]}
            >
              <IconSymbol
                name="iphone.gen3.motion"
                size={20}
                color={textPrimary}
              />
            </View>
            <AppText fontSize="md" fontColor={textPrimary} bold>
              Rever o tutorial
            </AppText>
            <View style={{ flex: 1 }} />
            <IconSymbol name="chevron.forward" size={20} color={textSecondary} />
          </Pressable>
          <View style={[styles.itemSeparator, { backgroundColor: outline }]} />
          <Pressable style={styles.item}>
            <View
              style={[
                styles.iconBg,
                {
                  backgroundColor: surface,
                },
              ]}
            >
              <IconSymbol name="trash" size={20} color={textPrimary} />
            </View>
            <AppText fontSize="md" fontColor={textPrimary} bold>
              Excluir meus dados
            </AppText>
            <View style={{ flex: 1 }} />
            <IconSymbol name="chevron.forward" size={20} color={textSecondary} />
          </Pressable>
        </ScrollView>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    height: 16,
  },
  body: {
    flex: 1,
  },
  bodyScroll: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    gap: 16,
  },
  topImage: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  topImageRing: {
    width: 76,
    height: 76,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerText: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconBg: {
    padding: 8,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  itemSeparator: {
    width: "100%",
    height: 1,
  },
});
