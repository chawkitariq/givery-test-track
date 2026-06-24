import { Recipe, SerializedRecipe } from "./types.js";

/**
 * Converts a raw MySQL recipe into the serialized API format.
 *
 * @param recipe Recipe as stored in the database.
 * @returns Serialized version ready to be returned to the client.
 */
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

/**
 * Indicates whether at least one field in the payload is `null`.
 *
 * @param fields Object to inspect.
 * @returns `true` if a field is null, otherwise `false`.
 */
export const hasNullField = (fields: Record<string, unknown>): boolean => {
  return Object.values(fields).some((d) => d === null);
};
