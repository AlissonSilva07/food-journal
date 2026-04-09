import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppButton } from "@/core/components/ui/app-button";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { OnboardingStackParamList } from "../../../navigation/Navigator";

export default function OnboardingUserNameScreen() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const navigation = useNavigation<NavigationProp<OnboardingStackParamList>>();
  const primary = useThemeColor({}, "primary");
  const textPrimary = useThemeColor({}, "text");
  const surface = useThemeColor({}, "surface");

  const input1Ref = useRef<TextInput | null>(null);

  const [userName, setUserName] = useState("");

  const [assets, error] = useAssets([
    require("@/assets/images/logo-light.png"),
    require("@/assets/images/logo-dark.png"),
  ]);

  useEffect(() => {
    input1Ref.current?.focus();
  }, [input1Ref]);

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
            iconName: "xmark",
            action: () => navigation.goBack(),
          }}
          center={renderLogoAsset()}
        />
        <View style={styles.spacer} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.body}>
            <Text
              style={[
                styles.titleStyle,
                {
                  color: textPrimary,
                },
              ]}
            >
              Qual o seu <Text style={{ color: primary }}>nome</Text>?
            </Text>
            <TextInput
              ref={input1Ref}
              style={[
                styles.input,
                {
                  backgroundColor: surface,
                  color: textPrimary,
                },
              ]}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              value={userName}
              onChangeText={(value: string) => setUserName(value)}
            />
            <AppButton
              title="Continuar"
              disabled={userName.trim() === ""}
              variant={userName.trim() === "" ? "disabled" : "default"}
              onPress={() =>
                navigation.navigate("UserAvatar", {
                  name: userName,
                })
              }
            />
          </View>
        </KeyboardAvoidingView>
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 16,
  },
  titleStyle: {
    fontFamily: "BricolageGrotesque",
    fontSize: 32,
  },
  input: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    fontFamily: "Geist",
    fontSize: 16,
  },
});
