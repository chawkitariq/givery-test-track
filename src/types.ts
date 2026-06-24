/**
 * Represents a recipe record as stored in the database.
 */
export type Recipe = {
  id: number;
  title: string;
  making_time: string;
  serves: string;
  ingredients: string;
  cost: number;
  created_at: Date;
  updated_at: Date;
};

/**
 * Represents the mutable fields accepted when creating or updating a recipe.
 */
export type RecipeMutation = {
  title: string;
  making_time: string;
  serves: string;
  ingredients: string;
  cost: number;
};

/**
 * Represents a recipe payload formatted for API responses.
 */
export type SerializedRecipe = {
  id: string;
  title: string;
  making_time: string;
  serves: string;
  ingredients: string;
  cost: string;
  created_at: string;
  updated_at: string;
};
