"use strict";

/*

@name: title of food
@macroPerNVQ: Macors per Nutrional Value Quantity
@totalCost: cost of item
@foodURL: website for food
@Unit: food measurement unit 
@costPerRecipe: amount used for recipe cost 
@nutrionalVQ: Nutrional value quantity
@totalQuantity: amount of food for price 

*/
class food {
  name = "";
  macrosPerNVQ = {
    cal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };
  totalCost = 0;
  foodURL = "";
  unit = "";
  costPerRecipe = 0;
  nutrionalVQ = 0;
  totalQuantity = 0;
  quantity4Recipe = 0;
  constructor(
    name,
    macrosPerNVQ,
    totalCost,
    foodURL,
    unit,
    costPerRecipe,
    nutrionalVQ,
    totalQuantity,
    quantity4Recipe
  ) {
    this.name = name;
    this.macrosPerNVQ = macrosPerNVQ;
    this.totalCost = totalCost;
    this.foodURL = foodURL;
    this.unit = unit;
    this.costPerRecipe = costPerRecipe;
    this.nutrionalVQ = nutrionalVQ;
    this.totalQuantity = totalQuantity;
    this.quantity4Recipe = quantity4Recipe;
  }
}

class recipes {
  name = "";
  ingredients = [];
  recipeCost = 0;
  costPerServing = 0;
  totalMacros = { cal: 0, protein: 0, carbs: 0, fat: 0 };
  macrosPerServing = { cal: 0, protein: 0, carbs: 0, fat: 0 };
  recipeURL = "";
  listofIngredients = "";
  numServings = 0;

  constructor(
    name,
    ingredients,
    recipeCost,
    costPerServing,
    totalMacros,
    macrosPerServing,
    recipeURL,
    listofIngredients,
    numServings
  ) {
    this.name = name;
    this.ingredients = ingredients;
    this.recipeCost = recipeCost;
    this.costPerServing = costPerServing;
    this.totalMacros = totalMacros;
    this.macrosPerServing = macrosPerServing;
    this.recipeURL = recipeURL;
    this.listofIngredients = listofIngredients;
    this.numServings = numServings;
  }
}

let egg = new food(
  "large eggs",
  { cal: 70, protein: 6, carbs: 0, fat: 5 },
  3.59,
  "https://www.walmart.ca/en/ip/great-value-large-eggs/6000023483943",
  "each",
  0,
  53,
  12
);

let eggWhites = new food(
  "egg whites",
  { cal: 30, protein: 7, carbs: 0, fat: 0 },
  5.48,
  "https://www.walmart.ca/en/ip/burnbrae-farms-naturegg-simply-egg-whites/6000196635380",
  "ml",
  0,
  63,
  1000
);
const frittataBB = new recipes(
  "Bacon Egg & Cheese Frittata Breakfast Burito",
  [],
  0,
  0,
  { cal: 0, protein: 0, carbs: 0, fat: 0 },
  { cal: 0, protein: 0, carbs: 0, fat: 0 },
  "https://www.instagram.com/p/CbsnrX1pv27/",
  `8 large eggs
100g egg whites
200g blended cottage cheese
4 slices of bacon
4 slices turkey bacon
4 laughing cow cheese wedges
2 bell peppers
1 onion
6 burrito tortillas
6 slices turkey bacon
60g light sour cream or Greek yogurt
60g hot sauce`,
  6
);

// // adding food to the ingredients array
frittataBB.ingredients.push(egg, eggWhites);

const listOfIngredientsSplit = frittataBB.listofIngredients.split("\n");
console.log(listOfIngredientsSplit);

// creates an array just of the names of the ingredients
const ingredNameArr = frittataBB.ingredients.map((food) => food.name);
console.log(ingredNameArr);

// sets quanitiy for all ingredients in recipe based upon listOfIngredients
const setQuantity4Recipe = function () {
  for (const name of ingredNameArr) {
    for (const li of listOfIngredientsSplit) {
      if (li.indexOf(name) != -1) {
        // gets the quantity of the foood required for the recipe from ingredientList
        frittataBB.ingredients.filter(
          (val) => val.name === name
        )[0].quantity4Recipe = Number(
          li.slice(0, li.indexOf(name)).replace("g", "")
        );
      }
    }
  }
  console.log(frittataBB);
};

setQuantity4Recipe();

const calcIngredientCost4Recipe = function (r) {
  r.ingredients.map((val) => {
    val.costPerRecipe =
      val.totalCost * (val.quantity4Recipe / val.totalQuantity);
    val.costPerRecipe = Number(val.costPerRecipe.toFixed(3));
  });

  console.log(r.ingredients);
};

calcIngredientCost4Recipe(frittataBB);

// calculates total cost of recipe
const costOfRecipe = function (r) {
  r.recipeCost = r.ingredients.reduce((acc, val) => {
    return (acc = acc + val.costPerRecipe);
  }, 0);
};

const calcCostPerServing = function (r) {
  r.costPerServing = r.recipeCost / r.numServings;
  r.costPerServing = Number(r.costPerServing.toFixed(3));
};

// should re-write
const calcTotalMacros = function (r) {
  // for calories
  r.totalMacros.cal = r.ingredients.reduce((acc, val) => {
    if (val.unit === "g" || val.unit === "ml") {
      return (acc +=
        (val.macrosPerNVQ.cal * val.quantity4Recipe) / val.nutrionalVQ);
    } else {
      return (acc += val.macrosPerNVQ.cal * val.quantity4Recipe);
    }
  }, 0);
  //for protein
  r.totalMacros.protein = r.ingredients.reduce((acc, val) => {
    if (val.unit === "g" || val.unit === "ml") {
      return (acc +=
        (val.macrosPerNVQ.protein * val.quantity4Recipe) / val.nutrionalVQ);
    } else {
      return (acc += val.macrosPerNVQ.protein * val.quantity4Recipe);
    }
  }, 0);
  // for carbs
  r.totalMacros.carbs = r.ingredients.reduce((acc, val) => {
    if (val.unit === "g" || val.unit === "ml") {
      return (acc +=
        (val.macrosPerNVQ.carbs * val.quantity4Recipe) / val.nutrionalVQ);
    } else {
      return (acc += val.macrosPerNVQ.carbs * val.quantity4Recipe);
    }
  }, 0);
  // for fat
  r.totalMacros.fat = r.ingredients.reduce((acc, val) => {
    if (val.unit === "g" || val.unit === "ml") {
      return (acc +=
        (val.macrosPerNVQ.fat * val.quantity4Recipe) / val.nutrionalVQ);
    } else {
      return (acc += val.macrosPerNVQ.fat * val.quantity4Recipe);
    }
  }, 0);
};

const macrosPerServing = function (r) {
  r.macrosPerServing.cal = r.totalMacros.cal / r.numServings;
  r.macrosPerServing.protein = r.totalMacros.protein / r.numServings;
  r.macrosPerServing.carbs = r.totalMacros.carbs / r.numServings;
  r.macrosPerServing.fat = r.totalMacros.fat / r.numServings;
};

costOfRecipe(frittataBB);
calcCostPerServing(frittataBB);
calcTotalMacros(frittataBB);
macrosPerServing(frittataBB);
console.log(frittataBB);
