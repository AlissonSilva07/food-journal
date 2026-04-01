import { MealWithIngredients } from "@/core/db/schema";
import { useMealStore } from "@/core/store/meals.store";
import { useEffect, useState } from "react";
import { Directory, File, Paths } from "expo-file-system/next";
import * as Sharing from "expo-sharing";

export function useGallery() {
  const { fetchAllMeals, mealsList } = useMealStore();
  const [selectedMeal, setSelectedMeal] = useState<MealWithIngredients | null>(
    null,
  );

  useEffect(() => {
    fetchAllMeals();
  }, []);

  const shareImage = async (imageUrl: string) => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing is not available on your device");
      return;
    }

    try {
      await Sharing.shareAsync(imageUrl, {
        mimeType: "image/jpeg",
        dialogTitle: "Share this image!",
        UTI: "image/jpeg",
      });
    } catch (error) {
      console.error("Error sharing image:", error);
      alert("An error occurred while trying to share the image.");
    }
  };

  return {
    mealsList,
    selectedMeal: {
      value: selectedMeal,
      setValue: setSelectedMeal,
    },
    shareImage
  };
}
