import { useMealStore } from "@/core/store/meals.store";
import { useEffect } from "react";

export function useHome() {
  const { fetchTodayMeals, todayMealsList } = useMealStore();

  useEffect(() => {
    fetchTodayMeals();
  }, []);

  return {
    todayMealsList,
  };
}
