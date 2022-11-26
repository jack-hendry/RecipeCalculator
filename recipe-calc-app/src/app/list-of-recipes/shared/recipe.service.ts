import { Injectable } from '@angular/core';

import { GeneralRecipe, GeneralFood } from '../../recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  listOfIngredientsSplit: string[] = RECIPE.listOfIngredients.split('\n');

  /**
   * returns useful object for subsequent functions
   * @param listOfIngredients
   * @returns
   */
  parseIngredientsList(listOfIngredients: string): {
    quantity: string[];
    name: string[];
  } {
    const quantityIngredient: string[] = listOfIngredients
      .split('\n')
      .map((val) =>
        val
          .split(' ')
          .slice(0, 1)
          .map((val) => val.replace('g', ''))
      )
      .flat(1);
    const nameIngredient: string[] = listOfIngredients
      .split('\n')
      .map((val) => val.split(' ').slice(1).join(' '));

    return {
      quantity: quantityIngredient,
      name: nameIngredient,
    };
  }
  /**
   *
   * keeps track of what ingredients are in food database and there index with the returned array
   *
   * @param ingredName
   * @returns
   */
  ingredientsExist(ingredNameArr: string[]) {
    const ingredExistArr: boolean[] = ingredNameArr.map((ingredName) => {
      return foodDataBase.map((val) => val.name).includes(ingredName);
    });

    const indexArr: number[] = ingredNameArr.map((ingredName) => {
      return foodDataBase.map((val) => val.name).indexOf(ingredName);
    });
    return {
      ingredExistArr: ingredExistArr,
      indexArr: indexArr,
    };
  }

  /**
   *
   *  Copies General Food instance of matching ingredient name
   *  and sets it's quantity
   * @param obj
   * @returns
   */
  ingredientsExistAction(obj: {
    quantity: string[];
    name: string[];
    ingredExistArr: boolean[];
    indexArr: number[];
  }): GeneralFood[] {
    const copyIngred: GeneralFood[] = [];
    obj.ingredExistArr.forEach((val, index) => {
      if (val) {
        copyIngred.push(foodDataBase[obj.indexArr[index]]);
        copyIngred.forEach(
          (ingred, i) => (ingred.quantity4Recipe = +obj.quantity[i])
        );
      } else {
        // const newFood: GeneralFood = {
        //   name: obj.name[index],
        //   //macrosPerNVQ: get from form
        //   //totalCost: get from form
        //   //foodURL: get from form
        //   //unit: ...
        //   // nutritionalVQ: ...
        //   // totalQuantity: ...
        // }
        // create a copy of instance
        // push to food database []
        // update quantity4Recipe and costPerRecipe fields with the parased copy
      }
    });

    return copyIngred;
  }
  /*

    const newFood: GeneralFood = {
      name: obj.name[index],

    }

  */
  // calcIngredientCost4Recipe(r: GeneralRecipe) {
  //   r.ingredients.map((val) => {
  //     val.costPerRecipe =
  //       val.totalCost * (val.quantity4Recipe / val.totalQuantity);
  //     val.costPerRecipe = Number(val.costPerRecipe.toFixed(3));
  //   });
  //   console.log(r.ingredients);
  // }

  // calculates total cost of recipe
  // costOfRecipe(r) {
  //   r.recipeCost = r.ingredients.reduce((acc, val) => {
  //     return (acc += val.costPerRecipe);
  //   }, 0);
  // }

  // calcCostPerServing(r) {
  //   r.costPerServing = r.recipeCost / r.numServings;
  //   r.costPerServing = Number(r.costPerServing.toFixed(3));
  // }

  calcTotalMacros(r: GeneralRecipe) {
    // for calories
    r.totalMacros.cal = r.ingredients.reduce((acc, val) => {
      if (val.unit === 'g' || val.unit === 'ml') {
        return (acc +=
          (val.macrosPerNVQ.cal * val.quantity4Recipe) / val.nutritionalVQ);
      } else {
        return (acc += val.macrosPerNVQ.cal * val.quantity4Recipe);
      }
    }, 0);
    //for protein
    r.totalMacros.protein = r.ingredients.reduce((acc, val) => {
      if (val.unit === 'g' || val.unit === 'ml') {
        return (acc +=
          (val.macrosPerNVQ.protein * val.quantity4Recipe) / val.nutritionalVQ);
      } else {
        return (acc += val.macrosPerNVQ.protein * val.quantity4Recipe);
      }
    }, 0);

    // for carbs
    r.totalMacros.carbs = r.ingredients.reduce((acc, val) => {
      if (val.unit === 'g' || val.unit === 'ml') {
        return (acc +=
          (val.macrosPerNVQ.carbs * val.quantity4Recipe) / val.nutritionalVQ);
      } else {
        return (acc += val.macrosPerNVQ.carbs * val.quantity4Recipe);
      }
    }, 0);
    // for fat
    r.totalMacros.fat = r.ingredients.reduce((acc, val) => {
      if (val.unit === 'g' || val.unit === 'ml') {
        return (acc +=
          (val.macrosPerNVQ.fat * val.quantity4Recipe) / val.nutritionalVQ);
      } else {
        return (acc += val.macrosPerNVQ.fat * val.quantity4Recipe);
      }
    }, 0);
  }
  macrosPerServing(r: GeneralRecipe) {
    r.macrosPerServing.cal = r.totalMacros.cal / r.numServings;
    r.macrosPerServing.protein = r.totalMacros.protein / r.numServings;
    r.macrosPerServing.carbs = r.totalMacros.carbs / r.numServings;
    r.macrosPerServing.fat = r.totalMacros.fat / r.numServings;
  }

  getRecipe() {
    return RECIPE;
  }
  getListOfRecipes(): GeneralRecipe[] {
    return RECIPELIST;
  }

  getRecipeFromRecipeList(selectedId: number): GeneralRecipe {
    return RECIPELIST[selectedId];
  }
}

let RECIPE: GeneralRecipe = {
  name: 'Bacon Egg & Cheese Frittata Breakfast Burrito',
  recipeCost: 0,
  costPerServing: 0,
  totalMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
  macrosPerServing: { cal: 0, protein: 0, carbs: 0, fat: 0 },
  recipeURL: 'https://www.instagram.com/p/CbsnrX1pv27/',
  listOfIngredients: `8 large eggs
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
  numServings: 6,
  ingredients: [
    {
      name: 'large eggs',
      macrosPerNVQ: { cal: 70, protein: 6, carbs: 0, fat: 5 },
      totalCost: 3.59,
      foodURL:
        'https://www.walmart.ca/en/ip/great-value-large-eggs/6000023483943',
      unit: 'each',
      costPerRecipeIng: 0,
      nutritionalVQ: 53,
      totalQuantity: 12,
      quantity4Recipe: 0,
    },
    {
      name: 'egg whites',
      macrosPerNVQ: { cal: 30, protein: 7, carbs: 0, fat: 0 },
      totalCost: 5.48,
      foodURL:
        'https://www.walmart.ca/en/ip/burnbrae-farms-naturegg-simply-egg-whites/6000196635380',
      unit: 'g',
      costPerRecipeIng: 0,
      nutritionalVQ: 63,
      totalQuantity: 1000,
      quantity4Recipe: 0,
    },
  ],
};

const foodDataBase: GeneralFood[] = [
  {
    id: 0,
    name: 'large eggs',
    macrosPerNVQ: { cal: 90, protein: 8, carbs: 1, fat: 7 },
    totalCost: 4.88,
    foodURL:
      'https://www.walmart.ca/en/ip/Gray-Ridge-Super-747-Jumbo-Eggs/6000191268590',
    unit: 'each',
    costPerRecipeIng: 0.406,
    nutritionalVQ: 1,
    totalQuantity: 12,
    quantity4Recipe: 8,
  },
  {
    id: 1,
    name: 'egg whites',
    macrosPerNVQ: { cal: 45, protein: 10, carbs: 1, fat: 0 },
    totalCost: 5.98,
    foodURL:
      'https://www.walmart.ca/en/ip/Burnbrae-Farms-Naturegg-Simply-Egg-Whites/6000196635380',
    unit: 'g',
    costPerRecipeIng: 0.598,
    nutritionalVQ: 100,
    totalQuantity: 1000,
    quantity4Recipe: 100,
  },
  {
    id: 2,
    name: 'blended cottage cheese',
    macrosPerNVQ: { cal: 80, protein: 12, carbs: 6, fat: 1 },
    totalCost: 4.58,
    foodURL:
      'https://www.walmart.ca/en/ip/Great-Value-1-Cottage-Cheese/6000200025050',
    unit: 'g',
    costPerRecipeIng: 1.221,
    nutritionalVQ: 113,
    totalQuantity: 750,
    quantity4Recipe: 200,
  },
  {
    id: 3,
    name: 'slices of bacon',
    macrosPerNVQ: { cal: 190, protein: 6, carbs: 1, fat: 18 },
    totalCost: 4.97,
    foodURL:
      'https://www.walmart.ca/en/ip/great-value-naturally-smoked-bacon/6000191272204',
    unit: 'each',
    costPerRecipeIng: 1.431,
    nutritionalVQ: 2,
    totalQuantity: 13.888,
    quantity4Recipe: 4,
  },
  {
    id: 4,
    name: 'slices turkey bacon',
    macrosPerNVQ: { cal: 70, protein: 4, carbs: 1, fat: 6 },
    totalCost: 5.97,
    foodURL:
      'https://www.walmart.ca/en/ip/butterball-bacon-style-turkey/6000191270120',
    unit: 'each',
    costPerRecipeIng: 0.955,
    nutritionalVQ: 2,
    totalQuantity: 25,
    quantity4Recipe: 4,
  },
  {
    id: 5,
    name: 'laughing cow cheese wedges',
    macrosPerNVQ: { cal: 25, protein: 2, carbs: 1, fat: 1.5 },
    totalCost: 7.97,
    foodURL:
      'https://www.walmart.ca/en/ip/the-laughing-cow-light-spreadable-cheese-24p/6000188743085',
    unit: 'each',
    costPerRecipeIng: 1.328,
    nutritionalVQ: 1,
    totalQuantity: 24,
    quantity4Recipe: 4,
  },
  {
    id: 6,
    name: 'bell peppers',
    macrosPerNVQ: { cal: 31, protein: 1, carbs: 6, fat: 0.3 },
    totalCost: 3.97,
    foodURL:
      'https://www.walmart.ca/en/ip/sunset-rainbow-bell-peppers-3ct/6000191284683',
    unit: 'each',
    costPerRecipeIng: 2.646,
    nutritionalVQ: 1,
    totalQuantity: 3,
    quantity4Recipe: 2,
  },
  {
    id: 7,
    name: 'onion',
    macrosPerNVQ: { cal: 128, protein: 0.8, carbs: 7.55, fat: 0.08 },
    totalCost: 1.69,
    foodURL:
      'https://www.walmart.ca/en/ip/sunset-rainbow-bell-peppers-3ct/6000191284683',
    unit: 'each',
    costPerRecipeIng: 1.69,
    nutritionalVQ: 1,
    totalQuantity: 1,
    quantity4Recipe: 1,
  },
  {
    id: 8,
    name: 'burrito tortillas',
    macrosPerNVQ: { cal: 170, protein: 5, carbs: 28, fat: 4 },
    totalCost: 3.97,
    foodURL:
      'https://www.walmart.ca/en/ip/dempsters-original-large-tortillas/1062614',
    unit: 'each',
    costPerRecipeIng: 0.397,
    nutritionalVQ: 1,
    totalQuantity: 10,
    quantity4Recipe: 6,
  },
  {
    id: 9,
    name: 'light sour cream',
    macrosPerNVQ: { cal: 30, protein: 2, carbs: 2, fat: 1.5 },
    totalCost: 2.28,
    foodURL:
      'https://www.walmart.ca/en/ip/great-value-5-mf-low-fat-sour-cream/6000196397981',
    unit: 'g',
    costPerRecipeIng: 0.273,
    nutritionalVQ: 30,
    totalQuantity: 500,
    quantity4Recipe: 60,
  },
  {
    id: 10,
    name: 'hot sauce',
    macrosPerNVQ: { cal: 0, protein: 0, carbs: 0, fat: 0 },
    totalCost: 4.67,
    foodURL:
      'https://www.walmart.ca/en/ip/Frank-s-RedHot-Hot-Sauce-Original/6000031773070',
    unit: 'g',
    costPerRecipeIng: 0.791,
    nutritionalVQ: 5,
    totalQuantity: 354,
    quantity4Recipe: 60,
  }
];

const RECIPELIST: GeneralRecipe[] = [
  {
    id: 0,
    name: 'Bacon Egg & Cheese Frittata Breakfast Burrito',
    recipeCost: 11.463,
    costPerServing: 1.91,
    totalMacros: {
      cal: 3256.592920353982,
      protein: 176.03893805309735,
      carbs: 219.16946902654865,
      fat: 184.4499115044248,
    },
    macrosPerServing: {
      cal: 542.7654867256637,
      carbs: 36.52824483775811,
      fat: 30.74165191740413,
      protein: 29.33982300884956,
    },
    recipeURL: 'https://www.instagram.com/p/CbsnrX1pv27/',
    listOfIngredients: `8 large eggs
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
    numServings: 6,
    ingredients: [
      {
        id: 0,
        name: 'large eggs',
        macrosPerNVQ: { cal: 90, protein: 8, carbs: 1, fat: 7 },
        totalCost: 4.88,
        foodURL:
          'https://www.walmart.ca/en/ip/Gray-Ridge-Super-747-Jumbo-Eggs/6000191268590',
        unit: 'each',
        costPerRecipeIng: 0.406,
        nutritionalVQ: 1,
        totalQuantity: 12,
        quantity4Recipe: 8,
      },
      {
        id: 1,
        name: 'egg whites',
        macrosPerNVQ: { cal: 45, protein: 10, carbs: 1, fat: 0 },
        totalCost: 5.98,
        foodURL:
          'https://www.walmart.ca/en/ip/Burnbrae-Farms-Naturegg-Simply-Egg-Whites/6000196635380',
        unit: 'g',
        costPerRecipeIng: 0.598,
        nutritionalVQ: 100,
        totalQuantity: 1000,
        quantity4Recipe: 100,
      },
      {
        id: 2,
        name: 'blended cottage cheese',
        macrosPerNVQ: { cal: 80, protein: 12, carbs: 6, fat: 1 },
        totalCost: 4.58,
        foodURL:
          'https://www.walmart.ca/en/ip/Great-Value-1-Cottage-Cheese/6000200025050',
        unit: 'g',
        costPerRecipeIng: 1.221,
        nutritionalVQ: 113,
        totalQuantity: 750,
        quantity4Recipe: 200,
      },
      {
        id: 3,
        name: 'slices of bacon',
        macrosPerNVQ: { cal: 190, protein: 6, carbs: 1, fat: 18 },
        totalCost: 4.97,
        foodURL:
          'https://www.walmart.ca/en/ip/great-value-naturally-smoked-bacon/6000191272204',
        unit: 'each',
        costPerRecipeIng: 1.431,
        nutritionalVQ: 2,
        totalQuantity: 13.888,
        quantity4Recipe: 4,
      },
      {
        id: 4,
        name: 'slices turkey bacon',
        macrosPerNVQ: { cal: 70, protein: 4, carbs: 1, fat: 6 },
        totalCost: 5.97,
        foodURL:
          'https://www.walmart.ca/en/ip/butterball-bacon-style-turkey/6000191270120',
        unit: 'each',
        costPerRecipeIng: 0.955,
        nutritionalVQ: 2,
        totalQuantity: 25,
        quantity4Recipe: 4,
      },
      {
        id: 5,
        name: 'laughing cow cheese wedges',
        macrosPerNVQ: { cal: 25, protein: 2, carbs: 1, fat: 1.5 },
        totalCost: 7.97,
        foodURL:
          'https://www.walmart.ca/en/ip/the-laughing-cow-light-spreadable-cheese-24p/6000188743085',
        unit: 'each',
        costPerRecipeIng: 1.328,
        nutritionalVQ: 1,
        totalQuantity: 24,
        quantity4Recipe: 4,
      },
      {
        id: 6,
        name: 'bell peppers',
        macrosPerNVQ: { cal: 31, protein: 1, carbs: 6, fat: 0.3 },
        totalCost: 3.97,
        foodURL:
          'https://www.walmart.ca/en/ip/sunset-rainbow-bell-peppers-3ct/6000191284683',
        unit: 'each',
        costPerRecipeIng: 2.646,
        nutritionalVQ: 1,
        totalQuantity: 3,
        quantity4Recipe: 2,
      },
      {
        id: 7,
        name: 'onion',
        macrosPerNVQ: { cal: 128, protein: 0.8, carbs: 7.55, fat: 0.08 },
        totalCost: 1.69,
        foodURL:
          'https://www.walmart.ca/en/ip/sunset-rainbow-bell-peppers-3ct/6000191284683',
        unit: 'each',
        costPerRecipeIng: 1.69,
        nutritionalVQ: 1,
        totalQuantity: 1,
        quantity4Recipe: 1,
      },
      {
        id: 8,
        name: 'burrito tortillas',
        macrosPerNVQ: { cal: 170, protein: 5, carbs: 28, fat: 4 },
        totalCost: 3.97,
        foodURL:
          'https://www.walmart.ca/en/ip/dempsters-original-large-tortillas/1062614',
        unit: 'each',
        costPerRecipeIng: 0.397,
        nutritionalVQ: 1,
        totalQuantity: 10,
        quantity4Recipe: 6,
      },
      {
        id: 9,
        name: 'light sour cream',
        macrosPerNVQ: { cal: 30, protein: 2, carbs: 2, fat: 1.5 },
        totalCost: 2.28,
        foodURL:
          'https://www.walmart.ca/en/ip/great-value-5-mf-low-fat-sour-cream/6000196397981',
        unit: 'g',
        costPerRecipeIng: 0.273,
        nutritionalVQ: 30,
        totalQuantity: 500,
        quantity4Recipe: 60,
      },
      {
        id: 10,
        name: 'hot sauce',
        macrosPerNVQ: { cal: 0, protein: 0, carbs: 0, fat: 0 },
        totalCost: 4.67,
        foodURL:
          'https://www.walmart.ca/en/ip/Frank-s-RedHot-Hot-Sauce-Original/6000031773070',
        unit: 'g',
        costPerRecipeIng: 0.791,
        nutritionalVQ: 5,
        totalQuantity: 354,
        quantity4Recipe: 60,
      },
    ],
  },
  {
    id: 1,
    name: 'Bacon Egg & Cheese Frittata Breakfast Burrito 2',
    recipeCost: 3,
    costPerServing: 2,
    totalMacros: { cal: 500, protein: 9, carbs: 12, fat: 18 },
    macrosPerServing: { cal: 500, protein: 9, carbs: 12, fat: 18 },
    recipeURL: 'https://www.instagram.com/p/CbsnrX1pv27/',
    listOfIngredients: `4 slices of bacon
4 slices turkey bacon`,
    numServings: 6,
    ingredients: [
      {
        name: 'slices of bacon',
        macrosPerNVQ: { cal: 500, protein: 9, carbs: 12, fat: 18 },
        totalCost: 3.59,
        foodURL:
          'https://www.walmart.ca/en/ip/great-value-large-eggs/6000023483943',
        unit: 'each',
        costPerRecipeIng: 1,
        nutritionalVQ: 53,
        totalQuantity: 12,
        quantity4Recipe: 3,
      },
      {
        name: 'slices turkey bacon',
        macrosPerNVQ: { cal: 500, protein: 9, carbs: 12, fat: 18 },
        totalCost: 5.48,
        foodURL:
          'https://www.walmart.ca/en/ip/burnbrae-farms-naturegg-simply-egg-whites/6000196635380',
        unit: 'g',
        costPerRecipeIng: 32,
        nutritionalVQ: 63,
        totalQuantity: 1000,
        quantity4Recipe: 4,
      },
    ],
  },
  {
    id: 2,
    name: 'HamBurger',
    recipeCost: 9.0,
    costPerServing: 3.0,
    totalMacros: { cal: 500, protein: 9, carbs: 12, fat: 18 },
    macrosPerServing: { cal: 500, protein: 9, carbs: 12, fat: 18 },
    recipeURL: 'https://www.instagram.com/p/CbsnrX1pv27/',
    listOfIngredients: `6 burrito tortillas
60g light sour cream or Greek yogurt
60g hot sauce`,
    numServings: 6,
    ingredients: [
      {
        name: 'burrito tortilla',
        macrosPerNVQ: { cal: 500, protein: 9, carbs: 12, fat: 18 },
        totalCost: 3.59,
        foodURL:
          'https://www.walmart.ca/en/ip/great-value-large-eggs/6000023483943',
        unit: 'each',
        costPerRecipeIng: 0,
        nutritionalVQ: 53,
        totalQuantity: 12,
        quantity4Recipe: 3,
      },
      {
        name: 'egg whites burrito tortilla',
        macrosPerNVQ: { cal: 500, protein: 9, carbs: 12, fat: 18 },
        totalCost: 5.48,
        foodURL:
          'https://www.walmart.ca/en/ip/burnbrae-farms-naturegg-simply-egg-whites/6000196635380',
        unit: 'g',
        costPerRecipeIng: 1.9,
        nutritionalVQ: 63,
        totalQuantity: 1000,
        quantity4Recipe: 79,
      },
      {
        name: 'hot sauce',
        macrosPerNVQ: { cal: 500, protein: 9, carbs: 12, fat: 18 },
        totalCost: 3.59,
        foodURL:
          'https://www.walmart.ca/en/ip/great-value-large-eggs/6000023483943',
        unit: 'each',
        costPerRecipeIng: 0,
        nutritionalVQ: 53,
        totalQuantity: 12,
        quantity4Recipe: 3,
      },
    ],
  },
];
