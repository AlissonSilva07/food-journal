import { useThemeColor } from "@/core/hooks/use-theme-color";
import { SymbolViewProps } from "expo-symbols";
import React from "react";
import { Image, SectionList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "./icon-symbol";
import { AppText } from "./app-text";
import {
  MealWithIngredients,
} from "@/core/db/schema";

export type MealEntryType =
  | "BREAKFAST"
  | "LUNCH"
  | "SNACK"
  | "DINNER"
  | "OTHER";

export interface MealEntry {
  id: number;
  title: string;
  description?: string;
  ingredients?: string[];
  meal_type: MealEntryType;
  score: number;
  timestamp?: Date;
  photo_url?: string;
}

export interface MealSection {
  title: MealEntryType;
  data: MealWithIngredients[];
}

export interface MealSectionTitle {
  title: string;
  iconName: SymbolViewProps["name"];
}

interface HomeSectionProps {
  meals: MealWithIngredients[]
}


export function HomeSection({
  meals
}: HomeSectionProps) {
  const insets = useSafeAreaInsets();

  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");

  const mealOrder: MealEntryType[] = ["BREAKFAST", "LUNCH", "SNACK", "DINNER"];

  const initialSections: MealSection[] = mealOrder.map((type) => ({
    title: type,
    data: [],
  }));

  const sortedSections = meals.reduce<MealSection[]>((acc, item) => {
    const section = acc.find((sec) => sec.title === item.mealType);

    if (section) {
      section.data.push(item);
    }

    return acc;
  }, initialSections);

  const renderSectionTitle = (title: MealEntryType) => {
    let mealSection: MealSectionTitle;

    switch (title) {
      case "BREAKFAST":
        mealSection = {
          title: "CAFÉ DA MANHÃ",
          iconName: "fork.knife",
        };
        break;
      case "LUNCH":
        mealSection = {
          title: "ALMOÇO",
          iconName: "fork.knife",
        };
        break;
      case "DINNER":
        mealSection = {
          title: "JANTAR",
          iconName: "fork.knife",
        };
        break;
      case "SNACK":
        mealSection = {
          title: "LANCHE",
          iconName: "fork.knife",
        };
        break;
      default:
        mealSection = {
          title: "CAFÉ DA MANHÃ",
          iconName: "fork.knife",
        };
        break;
    }

    return mealSection;
  };

  return (
    <SectionList
      sections={sortedSections}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => (
        <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
          Hoje
        </AppText>
      )}
      renderSectionHeader={({ section }) => {
        return (
          <View style={styles.sectionTitleRow}>
            <IconSymbol
              name={renderSectionTitle(section.title).iconName}
              size={12}
              color={textSecondary}
            />
            <AppText fontSize="sm" fontColor={textSecondary}>
              {renderSectionTitle(section.title).title}
            </AppText>
          </View>
        );
      }}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: surface }]}>
          <Image source={{ uri: item.imageUri! }} style={styles.image} />
          <View style={styles.textContainer}>
            <AppText bold fontColor={textPrimary}>
              {item.title}
            </AppText>
            {item.description && (
              <AppText fontSize="sm" fontColor={textSecondary}>
                {item.description}
              </AppText>
            )}
          </View>
          <IconSymbol name="chevron.right" size={20} color={textSecondary} />
        </View>
      )}
      renderSectionFooter={({ section }) => {
        if (section.data.length === 0) {
          return (
            <View style={styles.emptyContainer}>
              <IconSymbol name="fork.knife" size={24} color={textSecondary} />
              <AppText fontSize="sm" fontColor={textSecondary}>
                Nenhum item cadastrado
              </AppText>
            </View>
          );
        }
        return null;
      }}
      style={styles.section}
      contentContainerStyle={[
        styles.sectionScroll,
        { paddingBottom: insets.bottom + 88 },
      ]}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  section: {
    flex: 1,
    width: "100%",
  },
  sectionScroll: {
    gap: 16,
    paddingHorizontal: 16,
  },
  itemContainer: {
    paddingVertical: 8,
    paddingStart: 8,
    paddingEnd: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderRadius: 16,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
  emptyContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
});
