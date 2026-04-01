import { AppText } from "@/core/components/ui/app-text";
import { MealWithIngredients } from "@/core/db/schema";
import { useThemeColor } from "@/core/hooks/use-theme-color";
import { Paths } from "expo-file-system/next";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
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
  const insets = useSafeAreaInsets();
  const textPrimary = useThemeColor({}, "text");
  const outline = useThemeColor({}, "outline");

  const validMeals = React.useMemo(() => {
    return mealsHistory.filter((meal) => !!meal.imageUri);
  }, [mealsHistory]);

  const numColumns = 3;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const margin = 4;
  const itemSize = screenWidth / numColumns - margin * 2;

  const ListHeaderComponent = () => (
    <View style={styles.titlePadding}>
      <AppText fontFamily="display" fontSize="2xl" fontColor={textPrimary}>
        Galeria
      </AppText>
    </View>
  );

  if (selectedMeal.value?.imageUri) {
    const itemImageUri = selectedMeal.value?.imageUri
      ? `${Paths.document.uri}/${selectedMeal.value.imageUri}`
      : null;

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

  return (
    <FlatList
      data={validMeals}
      renderItem={({ item }) => {
        const itemImageUri = item.imageUri
          ? `${Paths.document.uri}/${item.imageUri}`
          : null;

        return (
          <Pressable
            onPress={() => selectedMeal.setValue(item)}
            style={[
              styles.item,
              {
                borderColor: outline,
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
    borderWidth: 1,
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
});
