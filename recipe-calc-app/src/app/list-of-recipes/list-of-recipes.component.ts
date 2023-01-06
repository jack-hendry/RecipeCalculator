import { RecipeService } from './shared/recipe.service';
import { GeneralRecipe } from './../recipe.model';
import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-of-recipes',
  templateUrl: './list-of-recipes.component.html',
  styleUrls: ['./list-of-recipes.component.css'],
})
export class ListOfRecipesComponent implements OnInit, OnChanges {
  listOfRecipes: GeneralRecipe[];
  selectedRecipeBase: GeneralRecipe;
  selectedRecipeID: number;
  selectedRecipeFlag: boolean = false;
  visibleRecipes: GeneralRecipe[];
  sortBy: string = '';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listOfRecipes = this.recipeService.getListOfRecipes();
    this.visibleRecipes = this.listOfRecipes.slice(0);
    console.log(this.route);
    console.log(this.sortBy);
    console.log(this.visibleRecipes);
  }

  ngOnChanges(): void {
    if (this.listOfRecipes) {
      if (this.sortBy === 'ascending') {
        this.visibleRecipes.sort(this.sortAscending);
      } else if (this.sortBy === 'descending') {
        this.visibleRecipes.sort(this.sortDescending);
      }
    }
  }

  sortAscending(r1: GeneralRecipe, r2: GeneralRecipe) {
    if (r1.name > r2.name) return 1;
    else if (r1.name === r2.name) return 0;
    else return -1;
  }
  sortDescending(r1: GeneralRecipe, r2: GeneralRecipe) {
    if (r1.name < r2.name) return 1;
    else if (r1.name === r2.name) return 0;
    else return -1;
  }

 
}
