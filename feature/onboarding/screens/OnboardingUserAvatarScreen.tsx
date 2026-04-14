import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppButton } from "@/core/components/ui/app-button";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { IconSymbol } from "@/core/components/ui/icon-symbol";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { useToastStore } from "@/core/store/toast.store";
import { useUserStore } from "@/core/store/user.store";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useAssets } from "expo-asset";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { OnboardingStackParamList } from "../../../navigation/Navigator";

export default function OnboardingUserAvatarScreen() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const navigation = useNavigation<NavigationProp<any>>();

  const route = useRoute<RouteProp<OnboardingStackParamList, "UserAvatar">>();
  const { name } = route.params;

  const { isLoading, setUser } = useUserStore();
  const showToast = useToastStore((state) => state.showToast);

  const screenHeight = Dimensions.get("screen").height;

  const primary = useThemeColor({}, "primary");
  const onPrimary = useThemeColor({}, "onPrimary");
  const textPrimary = useThemeColor({}, "text");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetImage = () => setImage(null);

  const setUserAndGoToApp = async () => {
    console.log(name, image);

    const result = await setUser({
      name,
      avatar: image,
    });

    if (result.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.navigate("Main", {
        screen: "Home",
      });
      showToast({
        message: "Usuário(a) salvo com sucesso!",
        type: "success",
      });
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showToast({
        message: "Erro ao salvar usuário(a)",
        type: "error",
      });
    }
  };

  const [assets, error] = useAssets([
    require("@/assets/images/logo-light.png"),
    require("@/assets/images/logo-dark.png"),
  ]);

  const renderLogoAsset = () => {
    if (assets && assets.length > 0) {
      if (isDarkTheme) {
        return (
          <Image
            source={{ uri: assets[1].uri }}
            style={{
              width: 42,
              height: 42,
              resizeMode: "contain",
            }}
          />
        );
      } else {
        return (
          <Image
            source={{ uri: assets[0].uri }}
            style={{
              width: 42,
              height: 42,
              resizeMode: "contain",
            }}
          />
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
            iconName: "arrow.backward",
            action: () => navigation.goBack(),
          }}
          center={renderLogoAsset()}
        />
        <View style={styles.spacer} />
        <View style={styles.body}>
          <Text
            style={[
              styles.titleStyle,
              {
                color: textPrimary,
                textAlign: "center",
              },
            ]}
          >
            {name}, que tal escolher um{" "}
            <Text style={{ color: primary }}>avatar</Text>?
          </Text>
          <View style={[styles.middleContent, { flex: 1 }]}>
            <View
              style={[
                styles.avatarEmptyContainerRing,
                {
                  backgroundColor: "transparent",
                  borderColor: primary,
                },
              ]}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.avatarImage} />
              ) : (
                <View
                  style={[
                    styles.avatarEmptyContainer,
                    {
                      backgroundColor: primary,
                    },
                  ]}
                >
                  <IconSymbol name="camera.fill" size={42} color={onPrimary} />
                </View>
              )}
            </View>
          </View>
          {image ? (
            <View style={styles.bottomButtons}>
              <AppButton
                title="Escolher e finalizar"
                disabled={isLoading}
                variant={isLoading ? "loading" : "default"}
                onPress={setUserAndGoToApp}
              />
              <AppButton
                title="Remover foto"
                variant="muted"
                onPress={resetImage}
              />
            </View>
          ) : (
            <View style={styles.bottomButtons}>
              <AppButton title="Abrir fotos" onPress={pickImage} />
              <AppButton
                title="Continuar sem avatar"
                variant="muted"
                onPress={setUserAndGoToApp}
              />
            </View>
          )}
        </View>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    gap: 16,
  },
  middleContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    fontFamily: "BricolageGrotesque",
    fontSize: 32,
  },
  avatarImage: {
    width: 164,
    height: 164,
    borderRadius: 100,
    resizeMode: "cover",
  },
  avatarEmptyContainer: {
    width: 164,
    height: 164,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmptyContainerRing: {
    width: 180,
    height: 180,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  bottomButtons: {
    width: "100%",
    flexDirection: "column",
    gap: 4,
  },
});
