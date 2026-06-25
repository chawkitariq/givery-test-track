import type { Request, Response } from "express";
import { requiredFields } from "./contants.js";
import {
  createRecipe,
  deleteOneRecipe,
  findAllRecipe,
  findOneRecipe,
  updateRecipe,
} from "./repository.js";
import { hasNullField, serializeRecipe } from "./utils.js";

/**
 * Creates a new recipe after validating the required fields.
 */
export async function createRecipeHandler(req: Request, res: Response) {
  const hasAllRequiredFiels = requiredFields.every((f) =>
    Object.keys(req.body).includes(f),
  );

  if (!hasAllRequiredFiels || hasNullField(req.body)) {
    return res.status(200).json({
      message: "Recipe creation failed!",
      required: "title, making_time, serves, ingredients, cost",
    });
  }

  const recipe = await createRecipe(req.body);

  res.status(200).json({
    message: "Recipe successfully created!",
    recipe: recipe.map(serializeRecipe),
  });
}

/**
 * Returns all available recipes.
 */
export async function listRecipesHandler(_req: Request, res: Response) {
  const recipes = await findAllRecipe();
  res.status(200).json({ recipes: recipes.map(serializeRecipe) });
}

/**
 * Returns the details of a recipe by its identifier.
 */
export async function getRecipeHandler(req: Request, res: Response) {
  const recipe = await findOneRecipe(+req.params.id);

  res.status(200).json({
    message: "Recipe details by id",
    recipe: recipe.map(serializeRecipe),
  });
}

/**
 * Updates an existing recipe.
 */
export async function updateRecipeHandler(req: Request, res: Response) {
  if (hasNullField(req.body)) {
    return res.status(200).json({
      message: "Recipe fields must not be null!",
    });
  }

  const recipe = await updateRecipe(+req.params.id, req.body);

  res.status(200).json({
    message: "Recipe successfully updated!",
    recipe: recipe.map(serializeRecipe),
  });
}

/**
 * Deletes a recipe by its identifier.
 */
export async function deleteRecipeHandler(req: Request, res: Response) {
  const isDeleted = await deleteOneRecipe(+req.params.id);

  if (!isDeleted) {
    return res.status(200).json({
      message: "No recipe found",
    });
  }

  res.status(200).json({
    message: "Recipe successfully removed!",
  });
}
