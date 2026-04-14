import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppAlert } from "@/core/components/ui/app-alert";
import { AppText } from "@/core/components/ui/app-text";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { IconSymbol } from "@/core/components/ui/icon-symbol";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { useUserStore } from "@/core/store/user.store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Paths } from "expo-file-system/next";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { MenuItem } from "../components/MenuItem";
import { useMenu } from "../hooks/useMenu";

export default function MenuScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");
  const primary = useThemeColor({}, "primary");
  const outline = useThemeColor({}, "outline");

  const { isLoading, user } = useUserStore();
  const { dialog, handleEraseData } = useMenu();

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
              {user?.name ? (
                <AppText fontSize="xl" fontColor={textPrimary} bold>
                  {user.name}
                </AppText>
              ) : (
                <AppText fontSize="xl" fontColor={textPrimary} bold>
                  Usuário(a)
                </AppText>
              )}
              {user?.createdAt && formattedDate && (
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
          <MenuItem
            title="Editar meu perfil"
            icon="person.crop.circle.fill"
            onPress={() => {}}
          />
          <View style={[styles.itemSeparator, { backgroundColor: outline }]} />
          <MenuItem
            title="Rever o tutorial"
            icon="iphone.gen3.motion"
            onPress={() => {}}
          />
          <View style={[styles.itemSeparator, { backgroundColor: outline }]} />
          <MenuItem
            title="Excluir meus dados"
            icon="trash"
            onPress={() => dialog.setValue(true)}
          />
          <View style={styles.spacer} />
          <View style={styles.bottomText}>
            <AppText fontSize="xs" fontColor={textSecondary}>
              Desenvolvido com ❤️ por @AlissonSilva07
            </AppText>
          </View>
        </ScrollView>
      </View>

      <AppAlert
        title="Atenção"
        visible={dialog.value}
        onClose={() => dialog.setValue(false)}
        positiveButton={{
          title: "Sim",
          action: () =>
            handleEraseData(() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "Onboarding",
                  },
                ],
              }),
            ),
        }}
        negativeButton={{
          title: "Não",
          action: () => {
            dialog.setValue(false);
          },
        }}
      >
        <AppText fontColor={textPrimary}>
          Deseja realmente apagar os seus dados? Esta ação é irreversível.
        </AppText>
      </AppAlert>
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
    alignItems: "center",
    justifyContent: "center",
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
  itemSeparator: {
    width: "100%",
    height: 0.5,
  },
  bottomText: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
