import { appColors } from "@/constants/colors";
import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import AppText from "./text";

interface AppInputProps extends TextInputProps {
  label: string;
  isFocused: boolean;
  hasErrors: boolean;
}

export const AppInput = forwardRef<TextInput, AppInputProps>(
  ({ label, isFocused, hasErrors, ...rest }, ref) => {
    const getLabelColor = () => {
      if (isFocused) {
        if (hasErrors) {
          return appColors.error;
        }
        return appColors.onBackground;
      }

      return appColors.onInverseBackground;
    };

    return (
      <View style={styles.container}>
        <AppText
          fontFamily="body"
          fontSize="md"
          bold
          fontColor={getLabelColor()}
        >
          {label}
        </AppText>
        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor={appColors.onInverseBackground}
          {...rest}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
  },
  input: {
    width: "100%",
    fontSize: 24,
    fontFamily: "BricolageGrotesque",
    color: appColors.primary,
  },
});
