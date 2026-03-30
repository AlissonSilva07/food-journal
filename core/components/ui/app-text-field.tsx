import { useThemeColor } from "@/core/hooks/use-theme-color";
import React, { forwardRef } from "react";
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { AppText } from "./app-text";

interface AppInputProps extends TextInputProps {
  isFocused: boolean;
  callBack: () => void;
}

export const AppTextField = forwardRef<TextInput, AppInputProps>(
  ({ isFocused, callBack, ...rest }, ref) => {
    const textPrimary = useThemeColor({}, "text");
    const textSecondary = useThemeColor({}, "textSecondary");
    const surface = useThemeColor({}, "surface");
    const primary = useThemeColor({}, "primary");
    const outline = useThemeColor({}, "outline");

    const getBorderColor = () => {
      if (isFocused) {
        return primary;
      }

      return outline;
    };

    return (
      <View
        style={[
          styles.container,
          {
            borderWidth: 1,
            borderColor: getBorderColor(),
            borderRadius: 16,
          },
        ]}
      >
        <TextInput
          ref={ref}
          style={[
            styles.input,
            {
              color: textPrimary,
            },
          ]}
          placeholderTextColor={textSecondary}
          {...rest}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
        <Pressable style={[styles.button, { backgroundColor: surface }]} onPress={callBack}>
            <AppText fontSize="sm" fontColor={textPrimary} bold>Adicionar</AppText>
        </Pressable>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Geist",
  },
  button: {
    padding: 8,
    borderRadius: 8,
  }
});
