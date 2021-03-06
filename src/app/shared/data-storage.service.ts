import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-e2d5b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
        .subscribe(response =>{
            console.log(response);
        })
    }

    fetchRecipes(){
        return this.authService.user.pipe(
        take(1), 
        exhaustMap(user => {
            //get an array of recipes from recipes endpoint
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-e2d5b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').pipe(
                map(recipes =>{
                    return recipes.map(recipe=>{ // map each recipe returning the recipe and if there are no ingredients then return empty array
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                    });
                }),tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                }));
        }));
    }

    storeUser(user: User){
        //call firebase
        return this.http.post('https://ng-course-recipe-book-e2d5b-default-rtdb.europe-west1.firebasedatabase.app/users.json', user)
        .subscribe(response => {
            console.log("Users Stored!");
            console.log(response);
        }, errors => {
            console.log("Error");
            console.log(errors);

        })

    }
}