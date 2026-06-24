import { db } from "./db.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { RecipeMutation, Recipe } from "./types.js";

/**
 * Creates a recipe in the database and returns the inserted record.
 *
 * @param payload Recipe data to insert.
 * @returns The newly created recipe.
 */
export async function createRecipe(payload: RecipeMutation): Promise<Recipe[]> {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await conn.execute<ResultSetHeader>(
      `INSERT INTO recipes
    (title, making_time, serves, ingredients, cost)
    VALUES (?, ?, ?, ?, ?)`,
      Object.values(payload),
    );

    const [recipe] = await conn.execute<RowDataPacket[]>(
      "SELECT * FROM recipes WHERE id = ?",
      [result.insertId],
    );

    await conn.commit();

    return recipe as Recipe[];
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

/**
 * Retrieves all available recipes.
 *
 * @returns The full list of recipes.
 */
export async function findAllRecipe(): Promise<Recipe[]> {
  const [recipes] = await db.execute<RowDataPacket[]>("SELECT * FROM recipes");
  return recipes as Recipe[];
}

/**
 * Retrieves a recipe by its identifier.
 *
 * @param id Numeric recipe identifier.
 * @returns The matching recipe, or an empty array if it does not exist.
 */
export async function findOneRecipe(id: Recipe["id"]): Promise<Recipe[]> {
  const [recipe] = await db.execute<RowDataPacket[]>(
    "SELECT * FROM recipes WHERE id = ?",
    [id],
  );
  return recipe as Recipe[];
}

/**
 * Updates an existing recipe and returns the saved version.
 *
 * @param id Numeric recipe identifier.
 * @param payload Values to apply to the recipe.
 * @returns The updated recipe.
 */
export async function updateRecipe(
  id: Recipe["id"],
  payload: RecipeMutation,
): Promise<Recipe[]> {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    await conn.execute(
      `UPDATE recipes
    SET title = ?, making_time = ?, serves = ?, ingredients = ?, cost = ?
    WHERE id = ?`,
      [...Object.values(payload), id],
    );

    const [recipe] = await conn.execute<RowDataPacket[]>(
      "SELECT * FROM recipes WHERE id = ?",
      [id],
    );

    await conn.commit();

    return recipe as Recipe[];
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

/**
 * Deletes a recipe by identifier.
 *
 * @param id Numeric recipe identifier.
 * @returns `true` if a row was deleted, otherwise `false`.
 */
export async function deleteOneRecipe(id: Recipe["id"]): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    "DELETE FROM recipes WHERE id = ?",
    [id],
  );
  return !!result.affectedRows;
}
