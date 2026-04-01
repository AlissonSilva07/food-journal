import { db } from "@/core/db/client";
import {
  ingredients as ingredientsTable,
  meals,
  MealWithIngredients,
  NewMeal,
} from "@/core/db/schema";
import { desc, eq, gte } from "drizzle-orm";
import { File, Paths } from "expo-file-system/next";
import { create } from "zustand";

interface MealStore {
  mealsList: MealWithIngredients[];
  todayMealsList: MealWithIngredients[];
  isLoading: boolean;
  addMeal: (
    mealData: NewMeal,
    ingredientsList: string[],
  ) => Promise<{ success: boolean; error?: string }>;
  fetchAllMeals: () => Promise<void>;
  fetchTodayMeals: () => Promise<void>;
  fetchMealById: (id: number) => Promise<MealWithIngredients | undefined>;
  deleteMeal: (id: number) => Promise<void>;
}

export const useMealStore = create<MealStore>((set, get) => ({
  mealsList: [],
  todayMealsList: [],
  isLoading: false,

  addMeal: async (mealData, ingredientsList) => {
    set({ isLoading: true });

    try {
      let finalImageUri = null;

      if (mealData.imageUri) {
        const extension = mealData.imageUri.split(".").pop() || "jpg";
        const fileName = `meal_${Date.now()}_${Math.floor(Math.random() * 1000)}.${extension}`;

        const sourceFile = new File(mealData.imageUri);
        const destinationFile = new File(Paths.document, fileName);

        await sourceFile.copy(destinationFile);

        if (destinationFile.exists) {
          finalImageUri = fileName;
        } else {
          throw new Error("File copy failed: Destination does not exist.");
        }
      }

      await db.transaction(async (tx) => {
        const [newMeal] = await tx
          .insert(meals)
          .values({
            ...mealData,
            imageUri: finalImageUri,
            createdAt: new Date(),
          })
          .returning();

        if (ingredientsList.length > 0) {
          const ingredientRows = ingredientsList.map((name) => ({
            name,
            mealId: newMeal.id,
          }));
          await tx.insert(ingredientsTable).values(ingredientRows);
        }
      });

      await Promise.all([get().fetchAllMeals(), get().fetchTodayMeals()]);
      return { success: true };
    } catch (error) {
      console.error("Error adding meal:", error);
      return { success: false, error: "Falha ao salvar a refeição." };
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAllMeals: async () => {
    set({ isLoading: true });
    try {
      const result = await db.query.meals.findMany({
        with: { ingredients: true },
        orderBy: [desc(meals.createdAt)], // Order by actual date, not just ID
      });
      set({ mealsList: result });
    } catch (error) {
      console.error("Error fetching all meals:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTodayMeals: async () => {
    set({ isLoading: true });
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const result = await db.query.meals.findMany({
        where: gte(meals.createdAt, startOfDay),
        with: { ingredients: true },
        orderBy: [desc(meals.createdAt)],
      });
      set({ todayMealsList: result });
    } catch (error) {
      console.error("Error fetching today's meals:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMealById: async (id: number) => {
    set({ isLoading: true });
    try {
      const result = await db.query.meals.findFirst({
        where: eq(meals.id, id),
        with: {
          ingredients: true,
        },
      });

      if (!result) {
        throw new Error("Meal not found");
      }

      return result;
    } catch (error) {
      console.error(`Error fetching meal with id ${id}`, error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteMeal: async (id: number) => {
    try {
      const mealToDelete = get().mealsList.find((m) => m.id === id);
      await db.delete(meals).where(eq(meals.id, id));
      if (mealToDelete?.imageUri) {
        const file = new File(Paths.document, mealToDelete.imageUri);
        if (file.exists) {
          file.delete();
        }
      }
      set((state) => ({
        mealsList: state.mealsList.filter((m) => m.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  },
}));
