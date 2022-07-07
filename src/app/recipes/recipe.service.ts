import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Bolagnase', 
  //       'Delicious rick sauce with pasta', 
  //       "https://recipetineats.com/wp-content/uploads/2018/07/Spaghetti-Bolognese.jpg",
  //       [
  //           new Ingredient('Meat',1),
  //           new Ingredient('Pasta',1),
  //           new Ingredient('Tomatoes',1),
  //           new Ingredient('Bazil',1), 
  //       ]),
  //   new Recipe('Chilli', 
  //       'Hot & Spicy chilli', 
  //       'https://www.hairybikers.com/uploads/images/_recipeImage/ChilliConCarne.jpg',
  //       [
  //           new Ingredient('Meat',1),
  //           new Ingredient('Rice',1),
  //           new Ingredient('kidney beans',1),

  //       ]),
  //   new Recipe('Steak', 
  //       'Juicy and tender steak', 
  //       'https://www.seriouseats.com/thmb/K40kegtcsC9WbzOCvogu-sjU79k=/1500x1125/filters:fill(auto,1)/butter-basted-pan-seared-steaks-recipe-hero-06-03b1131c58524be2bd6c9851a2fbdbc3.jpg', 
  //       [
  //           new Ingredient('Serlion Steak',1),
  //           new Ingredient('Potatoes',1),
  //           new Ingredient('Pepper core sauce',1),
  //       ])
  // ];

  private recipes:Recipe[] =[];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]){
    // console.log("Name: " + recipes[0].name)
    this.recipes = recipes;
    
    console.log(this.recipes);
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
 
  getRecipe(id:number){
    return this.recipes.slice()[id];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }

  updateRecipe(index: number, recipe:Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());

  }
}
