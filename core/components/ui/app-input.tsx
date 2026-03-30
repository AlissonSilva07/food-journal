import { useThemeColor } from "@/core/hooks/use-theme-color";
import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { AppText } from "./app-text";

interface AppInputProps extends TextInputProps {
  label: string;
  isFocused: boolean;
  hasErrors: boolean;
}

export const AppInput = forwardRef<TextInput, AppInputProps>(
  ({ label, isFocused, hasErrors, ...rest }, ref) => {
    const textPrimary = useThemeColor({}, "text");
    const textSecondary = useThemeColor({}, "textSecondary");
    const error = useThemeColor({}, "error");
    const primary = useThemeColor({}, "primary");

    const getLabelColor = () => {
      if (isFocused) {
        if (hasErrors) {
          return error;
        }
        return textPrimary;
      }

      return textSecondary;
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
          style={[styles.input, { color: primary }]}
          placeholderTextColor={textSecondary}
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
    width: "100%",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    width: "100%",
    fontSize: 24,
    fontFamily: "BricolageGrotesque",
  },
});
