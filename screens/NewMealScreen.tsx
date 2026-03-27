import { AppInput } from "@/components/ui/app-input";
import { MealEntryType } from "@/components/ui/home-section";
import AppText from "@/components/ui/text";
import TopBarButton from "@/components/ui/topbar-button";
import { appColors } from "@/constants/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootTabParamList } from "./Navigator";

export default function NewMealScreen() {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const insets = useSafeAreaInsets();
  const input1Ref = useRef<TextInput | null>(null);
  const input2Ref = useRef<TextInput | null>(null);

  const [title, setTitle] = useState("");
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const [description, setDescription] = useState("");
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const mealtypes: MealEntryType[] = [
    "BREAKFAST",
    "LUNCH",
    "SNACK",
    "DINNER",
    "OTHER",
  ];
  const [selectedMealType, setSelectedMealType] =
    useState<MealEntryType | null>(null);
  const [isMealTypeFocused, setIsMealTypeFocused] = useState(false);

  const getMealTypeTitle = (type: MealEntryType) => {
    let mealSection: string;

    switch (type) {
      case "BREAKFAST":
        mealSection = "CAFÉ DA MANHÃ";
        break;
      case "LUNCH":
        mealSection = "ALMOÇO";
        break;
      case "DINNER":
        mealSection = "JANTAR";
        break;
      case "SNACK":
        mealSection = "LANCHE";
        break;
      default:
        mealSection = "OUTRO";
        break;
    }

    return mealSection;
  };

  const canProcceed = () => {
    if (!title || title.trim() === "") return false;
    if (!selectedMealType) return false;
    return true;
  };

  useEffect(() => {
    input1Ref.current?.focus();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: Platform.select({
            ios: 0,
            android: insets.top,
          }),
        },
      ]}
    >
      <View style={styles.header}>
        <TopBarButton iconName="xmark" action={navigation.goBack} />
        {canProcceed() && <TopBarButton
          iconName="arrow.right"
          action={() =>
            navigation.navigate("Home", {
              screen: "Camera",
            })
          }
        />}
      </View>
      <View style={styles.spacer} />
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyScroll}>
        <AppText fontFamily="display" fontSize="2xl">
          Nova refeição
        </AppText>
        <AppInput
          ref={input1Ref}
          label={"Qual o nome da sua refeição?"}
          value={title}
          onChangeText={(value: string) => setTitle(value)}
          placeholder="Ex: Café da manhã reforçado"
          isFocused={isTitleFocused}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
          onEndEditing={() => {
            setIsDescriptionFocused(false);
            input2Ref.current?.focus();
          }}
          returnKeyType="next"
          hasErrors={false}
        />
        <AppInput
          ref={input2Ref}
          label={"Adicione uma descrição (opcional)"}
          value={description}
          onChangeText={(value: string) => setDescription(value)}
          placeholder="Ex: Parte da rotina 02"
          isFocused={isDescriptionFocused}
          onFocus={() => setIsDescriptionFocused(true)}
          onBlur={() => setIsDescriptionFocused(false)}
          onEndEditing={() => {
            setIsDescriptionFocused(false);
            input2Ref.current?.blur();
            setIsMealTypeFocused(true);
            Keyboard.dismiss();
          }}
          returnKeyType="next"
          hasErrors={false}
        />
        <View style={styles.mealTypeContainer}>
          <AppText
            fontFamily="body"
            fontSize="md"
            bold
            fontColor={
              isMealTypeFocused
                ? appColors.onBackground
                : appColors.onInverseBackground
            }
          >
            Qual o tipo da sua refeição?
          </AppText>
          <View style={styles.mealTypeRow}>
            {mealtypes.map((mt) => {
              const isSelected = mt === selectedMealType;
              return (
                <Pressable
                  key={mt}
                  style={[
                    styles.mealTypeItem,
                    {
                      borderWidth: 1,
                      borderColor: isSelected
                        ? appColors.primary
                        : appColors.outline,
                      backgroundColor: isSelected
                        ? appColors.primary
                        : appColors.background,
                    },
                  ]}
                  onPressIn={() => {
                    Keyboard.dismiss();
                    input1Ref.current?.blur();
                    input2Ref.current?.blur();
                    setSelectedMealType(mt);
                  }}
                >
                  <AppText
                    fontSize="sm"
                    bold
                    fontColor={
                      isSelected ? appColors.background : appColors.onBackground
                    }
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
