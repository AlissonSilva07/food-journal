import { db } from "@/core/db/client";
import {
  ingredients as ingredientsTable,
  meals,
  MealWithIngredients,
  NewMeal,
} from "@/core/db/schema";
import { desc, eq } from "drizzle-orm";
import { File, Paths } from "expo-file-system/next";
import { create } from "zustand";

interface MealStore {
  mealsList: MealWithIngredients[];
  isLoading: boolean;
  addMeal: (
    mealData: NewMeal,
    ingredientsList: string[],
  ) => Promise<{ success: boolean; error?: string }>;
  fetchMeals: () => Promise<void>;
  deleteMeal: (id: number) => Promise<void>;
}

export const useMealStore = create<MealStore>((set, get) => ({
  mealsList: [],
  isLoading: false,

  addMeal: async (mealData, ingredientsList) => {
    set({ isLoading: true });

    try {
      let finalImageUri = null;

      if (mealData.imageUri) {
        const fileName =
          mealData.imageUri.split("/").pop() || `meal_${Date.now()}.jpg`;
        const sourceFile = new File(mealData.imageUri);
        const destinationFile = new File(Paths.document, fileName);

        sourceFile.copy(destinationFile);
        finalImageUri = destinationFile.uri;
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

      await get().fetchMeals();

      return { success: true };
    } catch (error) {
      console.error("Error adding meal:", error);
      return { success: false, error: "Falha ao salvar a refeição." };
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMeals: async () => {
    set({ isLoading: true });
    try {
      const result = await db.query.meals.findMany({
        with: {
          ingredients: true,
        },
        orderBy: [desc(meals.id)],
      });
      set({ mealsList: result });
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteMeal: async (id: number) => {
    try {
      const mealToDelete = get().mealsList.find((m) => m.id === id);
      await db.delete(meals).where(eq(meals.id, id));
      if (mealToDelete?.imageUri) {
        const file = new File(mealToDelete.imageUri);
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
