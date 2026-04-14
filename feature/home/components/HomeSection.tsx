import { EmptyState } from "@/core/components/ui/empty-state";
import { MealWithIngredients } from "@/core/db/schema";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { RootTabParamList } from "@/navigation/Navigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import { Paths } from "expo-file-system/next";
import React from "react";
import {
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "../../../core/components/ui/app-text";
import { IconSymbol } from "../../../core/components/ui/icon-symbol";
import {
  MealEntryType,
  MealSection,
  MealSectionTitle,
} from "../types/meal.types";

interface HomeSectionProps {
  title: string;
  meals: MealWithIngredients[];
}

export function HomeSection({ title, meals }: HomeSectionProps) {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const insets = useSafeAreaInsets();

  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";

  const primary = useThemeColor({}, "primary");
  const surface = useThemeColor({}, "surface");
  const onSurface = useThemeColor({}, "onSurface");
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const itemEmptyBg = useThemeColor({}, "tabBar");

  const [assets, error] = useAssets([
    require("@/assets/images/logo-light.png"),
    require("@/assets/images/logo-dark.png"),
  ]);

  const renderAsset = () => {
    if (assets && assets.length > 0) {
      if (isDarkTheme) {
        return (
          <Image source={{ uri: assets[1].uri }} style={styles.emptyImage} />
        );
      } else {
        return (
          <Image source={{ uri: assets[0].uri }} style={styles.emptyImage} />
        );
      }
    }

    return null;
  };

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

  if (meals.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
          {title}
        </AppText>
        <EmptyState
          title="Nenhuma refeição ainda"
          subtitle="Experimente adicionar uma"
          callback={() =>
            navigation.navigate("Home", {
              screen: "New",
            })
          }
          image={renderAsset()}
        />
      </View>
    );
  }

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
        const isSectionEmpty = section.data.length === 0;
        return (
          <View
            style={[
              styles.sectionTitleRow,
              {
                justifyContent: isSectionEmpty ? "space-between" : "flex-start",
              },
            ]}
          >
            <AppText fontSize="sm" fontColor={textSecondary}>
              {renderSectionTitle(section.title).title}
            </AppText>
            {isSectionEmpty && (
              <View
                style={[
                  styles.itemEmptyIndicator,
                  { backgroundColor: surface },
                ]}
              >
                <IconSymbol
                  name="info.circle.fill"
                  size={12}
                  color={textSecondary}
                />
                <AppText fontSize="sm" fontColor={textSecondary}>
                  Não registrado
                </AppText>
              </View>
            )}
          </View>
        );
      }}
      renderItem={({ item }) => {
        const itemImageUri = `${Paths.document.uri}/${item.imageUri}`;
        return (
          <Pressable
            style={[styles.itemContainer, { backgroundColor: surface }]}
            onPress={() =>
              navigation.navigate("Home", {
                screen: "MealDetails",
                params: { id: item.id },
              })
            }
          >
            {item.imageUri ? (
              <Image source={{ uri: itemImageUri! }} style={styles.itemImage} />
            ) : (
              <View
                style={[
                  styles.itemEmptyImage,
                  { backgroundColor: itemEmptyBg },
                ]}
              >
                <IconSymbol name="fork.knife" size={24} color={textPrimary} />
              </View>
            )}
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
          </Pressable>
        );
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
    width: "100%",
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
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  itemEmptyImage: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  itemEmptyIndicator: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 100,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
  },
  emptyItem: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  emptyContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
    paddingHorizontal: 16,
  },
  emptyImage: {
    width: 88,
    height: 88,
    resizeMode: "contain",
  },
});
