import { RecipeService } from './../shared/recipe.service';
import { GeneralFood, GeneralRecipe } from './../../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css'],
})
export class SingleRecipeComponent implements OnInit {
  id: string = "";
  selectedRecipe?: GeneralRecipe;
  numId: number= 0;

  dataSource: GeneralFood[];
  ingredients: GeneralFood;

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.numId = +this.id;
    this.selectedRecipe = this.recipeService.getRecipeFromRecipeList(this.numId)
    
  }
}
