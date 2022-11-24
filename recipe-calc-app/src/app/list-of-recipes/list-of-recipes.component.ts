import { RecipeService } from './shared/recipe.service';
import { GeneralRecipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-of-recipes',
  templateUrl: './list-of-recipes.component.html',
  styleUrls: ['./list-of-recipes.component.css'],
})
export class ListOfRecipesComponent implements OnInit {
  listOfRecipes: GeneralRecipe[];
  selectedRecipeBase: GeneralRecipe;
  selectedRecipeID: number;
  selectedRecipeFlag: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listOfRecipes = this.recipeService.getListOfRecipes();
    console.log(this.route);
  }

  // toggleRecipeFlag(){
  //   this.selectedRecipeFlag = !this.selectedRecipeFlag;
  // }

  // goToSingleRecipe(name: string) {
  //   this.router.navigate(['recipes/',{id: name}]);
  //   this.toggleRecipeFlag();
  // }
}
