import { RecipeService } from './../shared/recipe.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeRouteActivator  implements CanActivate{
  constructor(private recipeService : RecipeService, private router: Router ){

  }

  canActivate(route: ActivatedRouteSnapshot) {
    console.log(route);
    const recipeExists = !!this.recipeService.getRecipeFromRecipeList(+route.params['id']);

    if(!recipeExists) {
      this.router.navigate(['/404']);
      console.log(this.router);
    }
    return recipeExists

  }


}
