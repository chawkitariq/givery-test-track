import { Recipe, SerializedRecipe } from "./types.js";

export const serializeRecipe = (recipe: Recipe): SerializedRecipe => ({
  id: recipe.id.toString(),
  title: recipe.title,
  making_time: recipe.making_time,
  serves: recipe.serves,
  ingredients: recipe.ingredients,
  cost: recipe.cost.toString(),
  created_at: recipe.created_at.toISOString(),
  updated_at: recipe.updated_at.toISOString(),
});

export const hasNullField = (fields: object) => {
  return Object.values(fields).some((d) => d === null)
};
