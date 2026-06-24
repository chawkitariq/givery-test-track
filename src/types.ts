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

export type RecipeMutation = {
  title: string;
  making_time: string;
  serves: string;
  ingredients: string;
  cost: number;
};

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