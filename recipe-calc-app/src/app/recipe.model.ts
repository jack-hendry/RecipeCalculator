export interface GeneralRecipe {
  id?: number,
  name: string;
  ingredients?: GeneralFood[];
  recipeCost?: number;
  costPerServing?: number;
  totalMacros?: Macros;
  macrosPerServing?: Macros;
  recipeURL: string;
  listOfIngredients: string;
  numServings: number;
  imgURL?: string;
}

export interface GeneralFood {
  id?: number,
  name: string;
  macrosPerNVQ?: Macros;
  totalCost?: number;
  foodURL?: string;
  unit?: string;
  costPerRecipeIng?: number;
  nutritionalVQ?: number;
  totalQuantity?: number;
  quantity4Recipe?: number;
}

export interface Macros {
  cal?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}
