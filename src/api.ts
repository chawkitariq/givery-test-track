import express from "express";
import "dotenv/config";
import { port, requiredFields } from "./contants.js";
import {
  createRecipe,
  deleteOneRecipe,
  findAllRecipe,
  findOneRecipe,
  updateRecipe,
} from "./repository.js";
import { cache } from "./middleware.js";
import { hasNullField, serializeRecipe } from "./utils.js";

const app = express();

app.use(express.json());

app.post("/recipes", async (req, res) => {
  const hasAllRequiredFiels = requiredFields.every((f) =>
    Object.keys(req.body).includes(f),
  );

  if (!hasAllRequiredFiels || hasNullField(req.body)) {
    return res.status(404).json({
      message: "Recipe creation failed!",
      required: "title, making_time, serves, ingredients, cost",
    });
  }

  const recipe = await createRecipe(req.body);

  res.status(200).json({
    message: "Recipe successfully created!",
    recipe: recipe.map(serializeRecipe),
  });
});

app.get("/recipes", cache(60), async (req, res) => {
  const recipes = await findAllRecipe();
  res.status(200).json({ recipes: recipes.map(serializeRecipe) });
});

app.get("/recipes/:id", cache(300), async (req, res) => {
  const recipe = await findOneRecipe(+req.params.id);

  res.status(200).json({
    message: "Recipe details by id",
    recipe: recipe.map(serializeRecipe),
  });
});

app.patch("/recipes/:id", async (req, res) => {
  if (hasNullField(req.body)) {
    return res.status(404).json({
      message: "Recipe fields must not be null!",
    });
  }

  const recipe = await updateRecipe(+req.params.id, req.body);

  res.status(200).json({
    message: "Recipe successfully updated!",
    recipe: recipe.map(serializeRecipe),
  });
});

app.delete("/recipes/:id", async (req, res) => {
  const isDeleted = await deleteOneRecipe(+req.params.id);

  if (!isDeleted) {
    return res.status(404).json({
      message: "No recipe found",
    });
  }

  res.status(200).json({
    message: "Recipe successfully removed!",
  });
});

app.listen(port, (error) => {
  console.log(`Server running: http://localhost:${port}`);
});
