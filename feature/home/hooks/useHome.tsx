import { useMealStore } from "@/core/store/meals.store";
import { useEffect } from "react";

export function useHome() {
  const { fetchMeals, mealsList } = useMealStore();

  useEffect(() => {
    fetchMeals();
  }, []);

  return {
    mealsList
  };
}
