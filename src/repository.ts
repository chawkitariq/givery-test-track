import { db } from "./db.js";
import { RecipeMutation, Recipe } from "./types.js";

export async function createRecipe(payload: RecipeMutation): Promise<Recipe[]> {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      `INSERT INTO recipes
    (title, making_time, serves, ingredients, cost)
    VALUES (?, ?, ?, ?, ?)`,
      Object.values(payload),
    );

    const [recipe] = await conn.execute("SELECT * FROM recipes WHERE id = ?", [
      result.insertId,
    ]);

    await conn.commit();

    return recipe as Recipe[];
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

export async function findAllRecipe(): Promise<Recipe[]> {
  const [recipes] = await db.execute("SELECT * FROM recipes");
  return recipes as Recipe[];
}

export async function findOneRecipe(id: Recipe["id"]): Promise<Recipe[]> {
  const [recipe] = await db.execute("SELECT * FROM recipes WHERE id = ?", [id]);
  return recipe as Recipe[];
}

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

    const [recipe] = await conn.execute("SELECT * FROM recipes WHERE id = ?", [
      id,
    ]);

    await conn.commit();

    return recipe as Recipe[];
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

export async function deleteOneRecipe(id: Recipe["id"]): Promise<boolean> {
  const [result] = await db.execute("DELETE FROM recipes WHERE id = ?", [id]);
  return !!result.affectedRows;
}
