import { Router } from '@angular/router';
import { GeneralRecipe, Macros } from './../recipe.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '.././list-of-recipes/shared/recipe.service';
import { Component } from '@angular/core';
import { GeneralFood } from '../recipe.model';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css'],
})
export class AddIngredientComponent {
  ingredDNEArr: GeneralFood[];
  ingredObj: { nameOfMissing?: string; form?: FormGroup }[] = [];
  newlyAddedRecipe: GeneralRecipe = this.recipeService
    .getListOfRecipes()
    .slice(-1)[0];
  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.ingredDNEArr = this.recipeService.getFoodDNE();

    // pushes new ingredients to ingredObj
    for (let i = 0; i < this.ingredDNEArr.length; i++) {
      this.ingredObj.push({
        nameOfMissing: this.ingredDNEArr[i].name,
        form: new FormGroup({
          macrosPerNutritonalVQEL: new FormControl('', Validators.required),
          totalCostOfIngredient: new FormControl('', Validators.required),
          ingredientURL: new FormControl('', Validators.required),
          unit4Ingredient: new FormControl('', Validators.required),
          quantityNV: new FormControl('', Validators.required),
          totalQuantityIngredient: new FormControl('', Validators.required),
        }),
      });
    }
  }

  formatMacros(str: string): Macros {
    const tmpMacro: Macros = {};
    if (str.split(',').every((val) => !isNaN(+val))) {
      tmpMacro.cal = +str.split(',')[0];
      tmpMacro.protein = +str.split(',')[1];
      tmpMacro.carbs = +str.split(',')[2];
      tmpMacro.fat = +str.split(',')[3];
      return tmpMacro;
    }
  }

  checkValidNum(str: string) {
    if (!isNaN(+str)) {
      return +str;
    }
  }
  checkValidUnit(str: string) {
    if (str === 'g' || str === 'ml' || str === 'each') {
      return str;
    }
  }

  saveNewIngredient(ingredientForm) {
    const formValues = this.ingredObj.map((val) => val.form.value);

    const ignore = this.recipeService
      .getFoodDataBase()
      .splice(length - 1 - this.ingredDNEArr.length);
    // Can probably can make this better
    let i = 0;
    this.newlyAddedRecipe.ingredients.forEach((val, index) => {
      if (isNaN(val.costPerRecipeIng)) {
        val.id = index;
        // val.macrosPerNVQ = formValues[index].macrosPerNutritonalVQEL;
        val.macrosPerNVQ = this.formatMacros(
          formValues[i].macrosPerNutritonalVQEL
        );
        val.totalCost = this.checkValidNum(formValues[i].totalCostOfIngredient);
        val.foodURL = formValues[i].ingredientURL;
        val.unit = this.checkValidUnit(formValues[i].unit4Ingredient);
        val.nutritionalVQ = this.checkValidNum(formValues[i].quantityNV);
        val.totalQuantity = this.checkValidNum(
          formValues[i].totalQuantityIngredient
        );
        i++;

        // need to refactor looks like ass
        // need to refactor looks like ass
        const tmpIngred: GeneralFood = { ...val };
        console.log(tmpIngred);
        tmpIngred.quantity4Recipe = 0;
        tmpIngred.id = this.recipeService.getFoodDataBase().length;
        this.recipeService.getFoodDataBase().push(tmpIngred);
        this.recipeService.recipeCalculator(this.newlyAddedRecipe);
        console.log(this.recipeService.getListOfRecipes());
      }
    });

    //
    console.log(this.recipeService.getFoodDataBase());
    //navigate back to recipe list
    this.router.navigate(['/recipes']);

    // console.log(this.newlyAddedRecipe.ingredients);
    // console.log(this.recipeService.getListOfRecipes().slice(-1)[0]);
  }
}
