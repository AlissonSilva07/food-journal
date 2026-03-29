import { relations } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const meals = sqliteTable("meals", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text(),
  mealType: text().notNull(),
  imageUri: text(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const ingredients = sqliteTable("ingredients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  mealId: integer("meal_id")
    .notNull()
    .references(() => meals.id, {
      onDelete: "cascade",
    }),
});

export const mealsRelations = relations(meals, ({ many }) => ({
  ingredients: many(ingredients),
}));

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  meal: one(meals, {
    fields: [ingredients.mealId],
    references: [meals.id],
  }),
}));

export type Meal = typeof meals.$inferSelect;
export type NewMeal = typeof meals.$inferInsert;
export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;

export type MealWithIngredients = Meal & {
  ingredients: Ingredient[];
};