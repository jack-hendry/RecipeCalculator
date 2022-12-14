import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { HomeComponent } from './home.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { SingleRecipeComponent } from './list-of-recipes/single-recipe/single-recipe.component';
import { ListOfRecipesComponent } from './list-of-recipes/list-of-recipes.component';

import { Routes } from '@angular/router';
import { Error404Component } from './404.component';
import { RecipeRouteActivator } from './list-of-recipes/single-recipe/recipe-route-activator.service';
import { MealplannerComponent } from './mealplanner/mealplanner.component';
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: ListOfRecipesComponent },
  { path: 'recipes/:id', component: SingleRecipeComponent, canActivate: [RecipeRouteActivator] },
  { path: 'new-recipe', component: NewRecipeComponent },
  { path: 'new-recipe/new-ingredient', component: AddIngredientComponent },
  { path: 'meal-planner', component: MealplannerComponent},
  { path: 'user', loadChildren: () => import('./users/user/users.module').then( m=> m.UserModule) },
  { path: '', redirectTo: '/home',pathMatch: 'full'},
  { path: '**', component: Error404Component },



];
