import { appColors } from "@/constants/colors";
import { SymbolViewProps } from "expo-symbols";
import React from "react";
import { Image, SectionList, StyleSheet, View } from "react-native";
import { IconSymbol } from "./icon-symbol.ios";
import AppText from "./text";

type MealEntryType = "BREAKFAST" | "LUNCH" | "SNACK" | "DINNER";

interface MealEntry {
  id: number;
  title: string;
  description?: string;
  ingredients?: string[];
  meal_type: MealEntryType;
  score: number;
  timestamp?: Date;
  photo_url?: string;
}

interface MealSection {
  title: MealEntryType;
  data: MealEntry[];
}

interface MealSectionTitle {
  title: string;
  iconName: SymbolViewProps["name"];
}

const mealEntries: MealEntry[] = [
  {
    id: 1,
    title: "Avocado Sourdough Toast",
    description:
      "Toasted sourdough topped with mashed avocado and chili flakes.",
    ingredients: ["Sourdough bread", "Avocado", "Chili flakes", "Lemon juice"],
    meal_type: "BREAKFAST",
    score: 5,
    timestamp: new Date("2026-03-27T08:00:00"),
    photo_url: "https://picsum.photos/seed/avocado/400",
  },
  {
    id: 2,
    title: "Mediterranean Quinoa Bowl",
    description: "Fresh quinoa salad with cucumber and feta.",
    ingredients: [
      "Quinoa",
      "Cucumber",
      "Cherry tomatoes",
      "Feta cheese",
      "Olive oil",
    ],
    meal_type: "LUNCH",
    score: 4,
    timestamp: new Date("2026-03-27T12:30:00"),
    photo_url: "https://picsum.photos/seed/quinoa/400",
  },
  {
    id: 3,
    title: "Post-Workout Shake",
    description: "Whey protein with oat milk and half a banana.",
    ingredients: ["Whey protein", "Oat milk", "Banana"],
    meal_type: "SNACK",
    score: 4,
    timestamp: new Date("2026-03-27T15:00:00"),
    photo_url: "https://picsum.photos/seed/shake/400",
  },
  {
    id: 5,
    title: "Greek Yogurt & Honey",
    description: "Thick Greek yogurt with honey and crushed walnuts.",
    ingredients: ["Greek yogurt", "Honey", "Walnuts"],
    meal_type: "SNACK",
    score: 4,
    timestamp: new Date("2026-03-27T10:30:00"),
    photo_url: "https://picsum.photos/seed/yogurt/400",
  },
  {
    id: 6,
    title: "Chicken Ginger Stir Fry",
    description: "Quick stir-fry with bell peppers and soy ginger sauce.",
    ingredients: [
      "Chicken breast",
      "Bell peppers",
      "Soy sauce",
      "Ginger",
      "Sesame oil",
    ],
    meal_type: "LUNCH",
    score: 4,
    timestamp: new Date("2026-03-26T13:00:00"),
    photo_url: "https://picsum.photos/seed/stirfry/400",
  },
];

export function HomeSection() {
  const mealOrder: MealEntryType[] = ["BREAKFAST", "LUNCH", "SNACK", "DINNER"];

  const initialSections: MealSection[] = mealOrder.map((type) => ({
    title: type,
    data: [],
  }));

  const sortedSections = mealEntries.reduce<MealSection[]>((acc, item) => {
    const section = acc.find((sec) => sec.title === item.meal_type);

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
        <AppText fontFamily="display" fontSize="2xl">
          Hoje
        </AppText>
      )}
      renderSectionHeader={({ section }) => {
        return (
          <View style={styles.sectionTitleRow}>
            <IconSymbol
              name={renderSectionTitle(section.title).iconName}
              size={12}
              color={appColors.onInverseBackground}
            />
            <AppText fontSize="sm" fontColor={appColors.onInverseBackground}>
              {renderSectionTitle(section.title).title}
            </AppText>
          </View>
        );
      }}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.photo_url }} style={styles.image} />
          <View style={styles.textContainer}>
            <AppText bold>{item.title}</AppText>
            {item.description && (
              <AppText fontSize="sm" fontColor={appColors.onInverseBackground}>
                {item.description}
              </AppText>
            )}
          </View>
          <IconSymbol
            name="chevron.right"
            size={20}
            color={appColors.onInverseBackground}
          />
        </View>
      )}
      renderSectionFooter={({ section }) => {
        if (section.data.length === 0) {
          return (
            <View style={styles.emptyContainer}>
              <IconSymbol
                name="fork.knife"
                size={24}
                color={appColors.onInverseBackground}
              />
              <AppText fontSize="sm" fontColor={appColors.onInverseBackground}>
                Nenhum item cadastrado
              </AppText>
            </View>
          );
        }
        return null;
      }}
      style={styles.section}
      contentContainerStyle={styles.sectionScroll}
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
    backgroundColor: appColors.surface,
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
