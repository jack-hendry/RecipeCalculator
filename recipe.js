// "use strict";

// class food {
//   name = "";
//   macrosPer10g = {
//     cal: 0,
//     protein: 0,
//     carbs: 0,
//     fat: 0,
//   };
//   macrosPer10ml = {
//     cal: 0,
//     protein: 0,
//     carbs: 0,
//     fat: 0,
//   };
//   pricePerQuanity = 0;
//   totalCost = 0;
//   foodURL = "";
//   size = 0;

//   calcMac4G = function (mac, size, unit) {
//     if (unit === "g") {
//       this.macrosPer10g.cal = mac.cal / (size / 10);
//       this.macrosPer10g.protein = mac.protein / (size / 10);
//       this.macrosPer10g.carbs = mac.carbs / (size / 10);
//       this.macrosPer10g.fat = mac.fat / (size / 10);
//     } else if (unit === "ml") {
//       this.macrosPer10ml.cal = mac.cal / (size / 10);
//       this.macrosPer10ml.protein = mac.protein / (size / 10);
//       this.macrosPer10ml.carbs = mac.carbs / (size / 10);
//       this.macrosPer10ml.fat = mac.fat / (size / 10);
//     }
//   };

//   constructor(name, mac, unit, size, foodURL, totalCost, pricePerQuanity) {
//     this.name = name;
//     this.foodURL = foodURL;
//     this.calcMac4G(mac, size, unit);
//     this.totalCost = totalCost;
//     this.pricePerQuanity = pricePerQuanity;
//     this.size = size;
//   }
// }

// class recipes {
//   name = "";
//   ingredients = [];
//   totalCost = 0;
//   costPerServing = 0;
//   totalMacros = { cal: 0, protein: 0, carbs: 0, fat: 0 };
//   macrosPerServing = { cal: 0, protein: 0, carbs: 0, fat: 0 };
//   recipeURL = "";
//   listofIngredients = "";

//   constructor(
//     name,
//     ingredients,
//     totalCost,
//     costPerServing,
//     totalMacros,
//     macrosPerServing,
//     recipeURL,
//     listofIngredients
//   ) {
//     this.name = name;
//     this.ingredients = ingredients;
//     this.totalCost = totalCost;
//     this.costPerServing = costPerServing;
//     this.totalMacros = totalMacros;
//     this.macrosPerServing = macrosPerServing;
//     this.recipeURL = recipeURL;
//     this.listofIngredients = listofIngredients;
//   }

//   /*
//   I have to iterate through ingredients array,
//   multiply macrosPer10g objects by serving size in recipe
//   and sum all calories, protein, fat and carbs
//   */
//   // totalMac = function(ingredients){
//   //   ingredients.map((val,i)=> {
//   //     val.cal
//   //   })
//   // }
// }

// // const r = {
// //   ingredients: [],
// //   cost4: 0,
// //   totalMacros: {},
// //   macrosPerServing: {},
// //   recipeURL: "",
// // };

// let egg = new food(
//   "large eggs",
//   { cal: 70, protein: 6, carbs: 0, fat: 5 },
//   "g",
//   53,
//   "https://www.walmart.ca/en/ip/great-value-large-eggs/6000023483943",
//   3.59,
//   0.3
// );

// let eggWhites = new food(
//   "Egg Whites",
//   { cal: 30, protein: 7, carbs: 0, fat: 0 },
//   "g",
//   63,
//   "https://www.walmart.ca/en/ip/burnbrae-farms-naturegg-simply-egg-whites/6000196635380",
//   5.48,
//   0.55
// );
// const frittataBB = new recipes(
//   "Bacon Egg & Cheese Frittata Breakfast Burito",
//   [],
//   0,
//   0,
//   { cal: 0, protein: 0, carbs: 0, fat: 0 },
//   { cal: 0, protein: 0, carbs: 0, fat: 0 },
//   "https://www.instagram.com/p/CbsnrX1pv27/",
//   `8 large eggs
// 100g egg whites
// 200g blended cottage cheese
// 4 slices of normal bacon
// 4 slices turkey bacon
// 1/2 tsp salt, adjust to taste
// Pepper, garlic + any seasonings you like
// 4 laughing cow cheese wedges
// 2 bell peppers
// 1 onion
// 6 burrito tortillas
// 6 slices turkey bacon
// 60g light sour cream or Greek yogurt
// 60g hot sauce
// Smoked paprika, garlic, onion`
// );

// console.log(egg);

// frittataBB.ingredients.push(egg);
// frittataBB.ingredients.push(eggWhites);

// console.log(frittataBB);

// const foodQuanity = function (r) {
//   // console.log(r.ingredients[0].name);

//   const splitList = r.listofIngredients.toLowerCase().split("\n");
//   const quaunityOnList = splitList.map((val) => val.split(" "));
//   console.log(quaunityOnList);

//   // console.log(quaunityOnList[1][0]);
//   for (let i = 0; i < quaunityOnList.length; i++) {
//     if (!quaunityOnList[i][0].endsWith("g") && Number(quaunityOnList[i][0])) {
//       console.log("a");
//       // totalMacros equal r.ingredients.food.macros10g * Number(quanityOnList[i][0]) per cal, pro, carbs and fat

//       // console.log(r.ingredients[i]);
//       r.totalMacros.cal =
//         r.ingredients[i]?.macrosPer10g.cal * Number(quaunityOnList[i][0]);
//       r.totalMacros.protein =
//         r.ingredients[i]?.macrosPer10g.protein * Number(quaunityOnList[i][0]);
//       r.totalMacros.carbs =
//         r.ingredients[i]?.macrosPer10g.carbs * Number(quaunityOnList[i][0]);
//       r.totalMacros.fat =
//         r.ingredients[i]?.macrosPer10g.fat * Number(quaunityOnList[i][0]);
//       console.log(r.totalMacros);
//     } else if (quaunityOnList[i][0].endsWith("g")) {
//       console.log(quaunityOnList[i][0].replace("g", ""));
//       const quan = Number(quaunityOnList[i][0].replace("g", ""));
//       console.log(quan);
//       r.totalMacros.cal =
//         r.ingredients[i]?.macrosPer10g.cal * (quan / r.ingredients[i]?.size);
//       r.totalMacros.protein =
//         r.ingredients[i]?.macrosPer10g.protein *
//         (quan / r.ingredients[i]?.size);
//       r.totalMacros.carbs =
//         r.ingredients[i]?.macrosPer10g.carbs * (quan / r.ingredients[i]?.size);
//       r.totalMacros.fat =
//         r.ingredients[i]?.macrosPer10g.fat * (quan / r.ingredients[i]?.size);
//       console.log(r.totalMacros);
//     } else {
//       console.log("c");
//     }
//   }
// };
// foodQuanity(frittataBB);

// const totalMac = function (recipe) {
//   recipe.ingredients.map((val, i) => {
//     val.macrosPer10g.cal;
//   });
// };

// totalMac(frittataBB);
// /*

// what does a Recipe have?
// - it has food items
// - cost4Meal
// - totalMacros:
//     macrosPerQuantity:
//             cal
//             protein
//             Carbs
//             Fat
// - recipeURL
// -

// what does food have?
//     Name
//     macrosPerQuantity:
//         cal
//         protein
//         Carbs
//         Fat
//     pricePerQuanitiy:
//     totalCost
//     foodURL

// */
