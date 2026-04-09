import { MainLayout } from "@/core/components/layout/MainLayout";
import { AppButton } from "@/core/components/ui/app-button";
import AppTopBar from "@/core/components/ui/app-top-bar";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
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

export default function OnboardingUserDataScreen() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const navigation = useNavigation<NavigationProp<OnboardingStackParamList>>();
  const primary = useThemeColor({}, "primary");
  const textPrimary = useThemeColor({}, "text");
  const surface = useThemeColor({}, "surface");

  return (
    <MainLayout>
      <View style={styles.container}>
        <AppTopBar
          leading={{
            iconName: "arrow.backward",
            action: () => {},
          }}
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
              style={[
                styles.input,
                {
                  backgroundColor: surface,
                  color: textPrimary,
                },
              ]}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
            <AppButton
              title="Continuar"
              onPress={() => navigation.navigate("Index")}
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
