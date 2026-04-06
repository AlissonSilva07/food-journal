import { AppText } from "@/core/components/ui/app-text";
import { MealWithIngredients } from "@/core/db/schema";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { RootTabParamList } from "@/navigation/Navigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import { Paths } from "expo-file-system/next";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface GridViewProps {
  mealsHistory: MealWithIngredients[];
  selectedMeal: {
    value: MealWithIngredients | null;
    setValue: React.Dispatch<React.SetStateAction<MealWithIngredients | null>>;
  };
}

export function GridView({ mealsHistory, selectedMeal }: GridViewProps) {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const insets = useSafeAreaInsets();
  const textPrimary = useThemeColor({}, "text");
  const textSecondary = useThemeColor({}, "textSecondary");
  const outline = useThemeColor({}, "outline");
  const primary = useThemeColor({}, "primary");

  const validMeals = React.useMemo(() => {
    return mealsHistory.filter((meal) => !!meal.imageUri);
  }, [mealsHistory]);

  const numColumns = 3;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const margin = 2;
  const itemSize = screenWidth / numColumns - margin * 2;

  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";

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

  const ListHeaderComponent = () => (
    <View style={styles.titlePadding}>
      <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
        Galeria
      </AppText>
    </View>
  );

  if (selectedMeal.value?.imageUri) {
    const itemImageUri = `${Paths.document.uri}/${selectedMeal.value.imageUri}`;

    return (
      <View
        style={[
          styles.fullImageContainer,
          {
            paddingBottom: insets.bottom + 56,
          },
        ]}
      >
        <View
          style={[
            styles.fullImageItem,
            {
              width: screenWidth,
              height: screenHeight / 1.6,
            },
          ]}
        >
          <Image
            source={{ uri: itemImageUri! }}
            style={{
              flex: 1,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    );
  }

  if (mealsHistory.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
          Galeria
        </AppText>
        <View style={styles.emptyContent}>
          {renderAsset()}
          <AppText fontFamily="display" fontSize="xl" fontColor={textPrimary}>
            Está vazio por aqui...
          </AppText>
          <AppText fontFamily="body" fontSize="md" fontColor={textSecondary}>
            Experimente adicionar uma refeição
          </AppText>
          <Pressable
            onPress={() =>
              navigation.navigate("Home", {
                screen: "New",
              })
            }
          >
            <AppText fontFamily="body" fontSize="md" bold fontColor={primary}>
              Adicionar
            </AppText>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={validMeals}
      renderItem={({ item }) => {
        const itemImageUri = `${Paths.document.uri}/${item.imageUri}`;

        return (
          <Pressable
            onPress={() => selectedMeal.setValue(item)}
            style={[
              styles.item,
              {
                margin: margin,
                height: itemSize,
                width: itemSize,
              },
            ]}
          >
            <Image source={{ uri: itemImageUri! }} style={styles.image} />
          </Pressable>
        );
      }}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      style={styles.container}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  item: {
  },
  titlePadding: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  fullImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fullImageItem: {},
  emptyContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
    paddingHorizontal: 16,
  },
  emptyContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emptyImage: {
    width: 88,
    height: 88,
    resizeMode: "contain",
  },
});
