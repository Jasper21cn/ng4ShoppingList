import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Brown Fish Fillet on White Ceramic Plate',
      'This is awesome! Must try!',
      'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
      [
        new Ingredient('Fish', 1),
        new Ingredient('Green Pepper', 5),
        new Ingredient('Red Pepper', 5)
      ]
    ),
    new Recipe(
      'Roasted Asparagus and Garlic Penne',
      'One of my favorite',
      'https://cdn.lifesambrosia.com/wp-content/uploads/roasted-asparagus-and-garlic-penne.jpg',
      [
        new Ingredient('Asparagus', 5),
        new Ingredient('Penne Pasta', 20),
        new Ingredient('Garlic Head', 3),
        new Ingredient('Olive Oil', 2)
      ]
    )
  ];

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
