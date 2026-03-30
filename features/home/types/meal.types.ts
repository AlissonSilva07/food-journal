import { MealWithIngredients } from "@/core/db/schema";
import { SymbolViewProps } from "expo-symbols";

export type MealEntryType =
  | "BREAKFAST"
  | "LUNCH"
  | "SNACK"
  | "DINNER"
  | "OTHER";

export interface MealEntry {
  id: number;
  title: string;
  description?: string;
  ingredients?: string[];
  meal_type: MealEntryType;
  score: number;
  timestamp?: Date;
  photo_url?: string;
}

export interface MealSection {
  title: MealEntryType;
  data: MealWithIngredients[];
}

export interface MealSectionTitle {
  title: string;
  iconName: SymbolViewProps["name"];
}

