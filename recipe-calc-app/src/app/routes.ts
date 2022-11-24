import { HomeComponent } from './home.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { SingleRecipeComponent } from './list-of-recipes/single-recipe/single-recipe.component';
import { ListOfRecipesComponent } from './list-of-recipes/list-of-recipes.component';

import { Routes } from '@angular/router';
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: ListOfRecipesComponent },
  { path: 'recipes/:id', component: SingleRecipeComponent },
  { path: 'new-recipe', component: NewRecipeComponent },
];
