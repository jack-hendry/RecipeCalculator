import { GeneralRecipe } from './../recipe.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../list-of-recipes/shared/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  newRecipeOBJ: GeneralRecipe;
  newRecipeForm: FormGroup;
  recipeName: FormControl;
  numServing: FormControl;
  recipeURL: FormControl;
  listOfIngredients: FormControl;
  numServingCheck;

  ingredientFlag: boolean;
  // if food doesn't exist in Database
  // macrosPerNutritonalVQEL?: FormControl;
  // totalCostOfIngredient?: FormControl;
  // ingredientURL?: FormControl;
  // unit4Ingredient?: FormControl;
  // quantityNV?: FormControl;
  // totalQuantityIngredient?: FormControl;
  // newIngredientForm?: FormGroup;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.ingredientFlag = false;
    this.recipeName = new FormControl('', {validators: Validators.required, updateOn: 'blur'});
    this.numServing = new FormControl('', Validators.required);
    this.recipeURL = new FormControl('', Validators.required);
    this.listOfIngredients = new FormControl('', Validators.required);
    this.newRecipeForm = new FormGroup({
      recipeName: this.recipeName,
      numServing: this.numServing,
      recipeURL: this.recipeURL,
      listOfIngredients: this.listOfIngredients,
    });
    console.log(this.newRecipeForm);
    this.numServingCheck = this.recipeService.checkIfNum;
  }


  // checkIfNum(str: string) : boolean {
  //   return isNaN(+str)
  // }
  /**
   * On save actions
   * @param recipeData
   */
  saveNewRecipe(recipeData) {
    // assigning User Inputs to new GeneralRecipe instance
    this.newRecipeOBJ = {
      name: recipeData.recipeName,
      recipeURL: recipeData.recipeURL,
      listOfIngredients: recipeData.listOfIngredients,
      numServings: recipeData.numServing,
      totalMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
      macrosPerServing: { cal: 0, protein: 0, carbs: 0, fat: 0 },
    };


    const parsedValue = this.recipeService.parseIngredientsList(
      this.newRecipeOBJ.listOfIngredients
    );
    const foodDataBaseRef = this.recipeService.ingredientsExist(
      parsedValue.name
    );

    console.log(foodDataBaseRef);

    const bridgeArr = {
      ...parsedValue,
      ...foodDataBaseRef,
    };

    console.log(bridgeArr);
    console.log(this.ingredientFlag);

    this.newRecipeOBJ.ingredients = this.recipeService.ingredientsExistAction({
      ...parsedValue,
      ...foodDataBaseRef,
    });

    console.log(this.newRecipeOBJ.ingredients);
    this.newRecipeOBJ.ingredients.forEach((val) => {
      if (isNaN(val.costPerRecipeIng)) {
        this.ingredientFlag = true;
        this.router.navigate(['new-recipe/new-ingredient']);

      }
    });

    this.recipeService.getListOfRecipes().push(this.newRecipeOBJ);
    if(!this.ingredientFlag) {
      this.recipeService.recipeCalculator(this.newRecipeOBJ);
      console.log(this.recipeService.getListOfRecipes());
      this.router.navigate(['/recipes']);
    }
    // this.newRecipeOBJ.ingredients.forEach((val) => {
    //   val.costPerRecipeIng =
    //     (val.quantity4Recipe / val.totalQuantity) * val.totalCost;
    // });
    // console.log(this.newRecipeOBJ.ingredients);

    // this.newRecipeOBJ.recipeCost = this.newRecipeOBJ.ingredients.reduce(
    //   (acc, val) => {
    //     return (acc += val.costPerRecipeIng);
    //   },
    //   0
    // );
    // this.newRecipeOBJ.costPerServing =
    //   this.newRecipeOBJ.recipeCost / +this.newRecipeOBJ.numServings;

    // this.recipeService.calcTotalMacros(this.newRecipeOBJ);
    // this.recipeService.macrosPerServing(this.newRecipeOBJ);
    // console.log(this.newRecipeOBJ);
    // //}
    // // adds list of ingredients to Recipe

    // this.newRecipeOBJ.id = this.recipeService.getListOfRecipes().length;
    // console.log(this.newRecipeOBJ);
    // // update recipe list
    // this.recipeService.getListOfRecipes().push(this.newRecipeOBJ);
    // console.log(this.recipeService.getListOfRecipes());
  }

  saveNewIngredient(data) {}
}
