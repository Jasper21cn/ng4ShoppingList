import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
      ])
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
