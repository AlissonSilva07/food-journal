import { MealWithIngredients } from "@/core/db/schema";
import { useMealStore } from "@/core/store/meals.store";
import { useEffect, useState } from "react";

export function useGallery() {
  const { fetchAllMeals, mealsList } = useMealStore();
  const [selectedMeal, setSelectedMeal] = useState<MealWithIngredients | null>(
    null,
  );

  useEffect(() => {
    fetchAllMeals();
  }, []);

  return {
    mealsList,
    selectedMeal: {
      value: selectedMeal,
      setValue: setSelectedMeal,
    },
  };
}
