import { AppText } from "@/core/components/ui/app-text";
import { AppTextField } from "@/core/components/ui/app-text-field";
import { IconSymbol } from "@/core/components/ui/icon-symbol";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import React, { useRef } from "react";
import { FlatList, Keyboard, Pressable, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface MealInfoTabProps {
  key: number;
  inputText: {
    value: string;
    onChangeText: (value: string) => void;
    isFocused: boolean;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  };
  ingredients: {
    list: string[];
    add: (ingredient: string) => void;
    remove: (ingredient: string) => void;
    checkDuplicate: (ingredient: string) => boolean;
  };
}

export default function MealIngredientsTab({
  key,
  inputText,
  ingredients,
}: MealInfoTabProps) {
  const background = useThemeColor({}, "background");
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");

  const input1Ref = useRef<TextInput | null>(null);

  const renderListItem = ({ item }: { item: string }) => {
    return (
      <View style={[styles.ingredientContainer, { backgroundColor: surface }]}>
        <AppText fontColor={onSurface}>{item}</AppText>
        <Pressable onPress={() => ingredients.remove(item)}>
          <IconSymbol name="xmark" size={24} color={onSurface} />
        </Pressable>
      </View>
    );
  };

  const renderEmptyList = () => {
    if (ingredients.list.length === 0) {
      return (
        <View style={styles.emptyListContainer}>
          <IconSymbol name="fork.knife" size={64} color={textSecondary} />
          <AppText fontSize="md" fontColor={textSecondary}>
            Nenhum ingrediente cadastrado
          </AppText>
        </View>
      );
    }
  };

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
      <View style={styles.body}>
        <View style={styles.bodyTopContent}>
          <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
            Ingredientes
          </AppText>
          <View style={styles.spacer} />
          <AppTextField
            ref={input1Ref}
            value={inputText.value}
            onChangeText={inputText.onChangeText}
            isFocused={inputText.isFocused}
            onFocus={() => inputText.setFocused(true)}
            onBlur={() => inputText.setFocused(false)}
            onEndEditing={() => {
              inputText.setFocused(false);
              input1Ref.current?.blur();
              Keyboard.dismiss();
              ingredients.add(inputText.value);
            }}
            returnKeyType="done"
            placeholder="Adicione um ingrediente"
            callBack={() => {
              inputText.onChangeText("");
              ingredients.add(inputText.value);
            }}
          />
        </View>
        <View style={styles.spacer} />
        <FlatList
          data={ingredients.list}
          keyExtractor={(i, index) => index.toString()}
          renderItem={renderListItem}
          ListEmptyComponent={renderEmptyList}
          style={styles.ingredientsList}
          contentContainerStyle={styles.ingredientsListContainer}
        />
      </View>
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
    flexDirection: "column",
    alignItems: "flex-start",
  },
  bodyTopContent: {
    flexDirection: "column",
    paddingHorizontal: 16,
  },
  ingredientContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  ingredientsList: {
    flex: 1,
    width: "100%",
  },
  ingredientsListContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 8,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});
