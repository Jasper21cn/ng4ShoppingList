import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    // const token = this.authService.getToken();
    // return this.httpClient.put('https://ng-recipe-book-549fe.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    // });
    const req = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-549fe.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {reportProgress: true}
      );
    return this.httpClient.request(req);
  }

  getRecipes() {
    // const token = this.authService.getToken();
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-549fe.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}
