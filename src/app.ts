import express from "express";
import { port } from "./contants.js";
import { cache } from "./middleware.js";
import {
  createRecipeHandler,
  deleteRecipeHandler,
  getRecipeHandler,
  listRecipesHandler,
  updateRecipeHandler,
} from "./handler.js";

const app = express();

app.use(express.json());

app.post("/recipes", createRecipeHandler);
app.get("/recipes", cache(60), listRecipesHandler);
app.get("/recipes/:id", cache(300), getRecipeHandler);
app.patch("/recipes/:id", updateRecipeHandler);
app.delete("/recipes/:id", deleteRecipeHandler);

app.listen(port, (error) => {
  console.log(`Server running: http://localhost:${port}`);
});
