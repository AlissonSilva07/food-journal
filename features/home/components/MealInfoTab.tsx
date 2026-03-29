import { AppInput } from "@/core/components/ui/app-input";
import { AppText } from "@/core/components/ui/app-text";
import { MealEntryType } from "@/core/components/ui/home-section";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import React, { useEffect, useRef } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

interface MealInfoTabProps {
  key: number;
  title: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    isFocused: boolean;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
  };
  description: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    isFocused: boolean;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  };
  mealtype: {
    list: MealEntryType[];
    selectedMealType: MealEntryType | null;
    setSelectedMealType: React.Dispatch<
      React.SetStateAction<MealEntryType | null>
    >;
    isFocused: boolean;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
  };
  getMealTypeTitle: (type: MealEntryType) => string;
}

export default function MealInfoTab({
  key,
  title,
  description,
  mealtype,
  getMealTypeTitle,
}: MealInfoTabProps) {
  const input1Ref = useRef<TextInput | null>(null);
  const input2Ref = useRef<TextInput | null>(null);

  const primary = useThemeColor({}, "primary");
  const onPrimary = useThemeColor({}, "onPrimary");
  const outline = useThemeColor({}, "outline");
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const background = useThemeColor({}, "background");
  const inverseBackground = useThemeColor({}, "inverseBackground");
  const error = useThemeColor({}, "error");

  const getMealTypeLabelColor = () => {
    if (mealtype.isFocused) {
      return textPrimary;
    }

    if (!!mealtype.error) {
      return error;
    }

    return textSecondary;
  };

  useEffect(() => {
    input1Ref.current?.focus();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: background,
        },
      ]}
      key={key}
    >
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyScroll}>
        <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
          Nova refeição
        </AppText>
        <AppInput
          ref={input1Ref}
          label={"Qual o nome da sua refeição?"}
          value={title.value}
          onChangeText={(value: string) => title.setValue(value)}
          placeholder="Ex: Café da manhã reforçado"
          isFocused={title.isFocused}
          onFocus={() => title.setFocused(true)}
          onBlur={() => title.setFocused(false)}
          onEndEditing={() => {
            description.setFocused(false);
            input2Ref.current?.focus();
          }}
          returnKeyType="next"
          hasErrors={!!title.error}
        />
        <AppInput
          ref={input2Ref}
          label={"Adicione uma descrição (opcional)"}
          value={description.value}
          onChangeText={(value: string) => description.setValue(value)}
          placeholder="Ex: Parte da rotina 02"
          isFocused={description.isFocused}
          onFocus={() => description.setFocused(true)}
          onBlur={() => description.setFocused(false)}
          onEndEditing={() => {
            description.setFocused(false);
            input2Ref.current?.blur();
            mealtype.setFocused(true);
            Keyboard.dismiss();
          }}
          returnKeyType="next"
          hasErrors={false}
        />
        <View style={styles.mealTypeContainer}>
          <AppText fontSize="md" bold fontColor={getMealTypeLabelColor()}>
            Qual o tipo da sua refeição?
          </AppText>
          <View style={styles.mealTypeRow}>
            {mealtype.list.map((mt) => {
              const isSelected = mt === mealtype.selectedMealType;
              return (
                <Pressable
                  key={mt}
                  style={[
                    styles.mealTypeItem,
                    {
                      borderWidth: 1,
                      borderColor: isSelected ? primary : outline,
                      backgroundColor: isSelected ? primary : background,
                    },
                  ]}
                  onPressIn={() => {
                    Keyboard.dismiss();
                    input1Ref.current?.blur();
                    input2Ref.current?.blur();
                    mealtype.setSelectedMealType(mt);
                  }}
                >
                  <AppText
                    fontSize="sm"
                    bold
                    fontColor={isSelected ? onPrimary : inverseBackground}
                  >
                    {getMealTypeTitle(mt)}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
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
  },
  bodyScroll: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    gap: 16,
  },
  mealTypeContainer: {
    flexDirection: "column",
    gap: 16,
  },
  mealTypeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  mealTypeItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
