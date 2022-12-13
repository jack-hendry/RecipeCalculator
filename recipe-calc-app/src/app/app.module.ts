import { CommonModule } from '@angular/common';
import { RecipeService } from './list-of-recipes/shared/recipe.service';
import { Error404Component } from './404.component';
import { HomeComponent } from './home.component';
import { appRoutes } from './routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ListOfRecipesComponent } from './list-of-recipes/list-of-recipes.component';
import { SingleRecipeComponent } from './list-of-recipes/single-recipe/single-recipe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { RecipeRouteActivator } from './list-of-recipes/single-recipe/recipe-route-activator.service';
import { MealplannerComponent } from './mealplanner/mealplanner.component';
import { CookingtimePipe } from './shared/cookingtime.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListOfRecipesComponent,
    SingleRecipeComponent,
    NavbarComponent,
    NewRecipeComponent,
    HomeComponent,
    AddIngredientComponent,
    Error404Component,
    MealplannerComponent,
    CookingtimePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  providers: [
    RecipeService,
    RecipeRouteActivator,
   ],
  bootstrap: [AppComponent],
})
export class AppModule {}


