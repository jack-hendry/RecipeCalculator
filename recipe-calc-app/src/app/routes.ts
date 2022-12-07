import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { HomeComponent } from './home.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { SingleRecipeComponent } from './list-of-recipes/single-recipe/single-recipe.component';
import { ListOfRecipesComponent } from './list-of-recipes/list-of-recipes.component';

import { Routes } from '@angular/router';
import { Error404Component } from './404.component';
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: ListOfRecipesComponent },
  { path: 'recipes/:id', component: SingleRecipeComponent },
  { path: 'new-recipe', component: NewRecipeComponent },
  { path: 'new-recipe/new-ingredient', component: AddIngredientComponent },
  {path: '', redirectTo: '/events',pathMatch: 'full'},
  { path: '**', component: Error404Component }
];
