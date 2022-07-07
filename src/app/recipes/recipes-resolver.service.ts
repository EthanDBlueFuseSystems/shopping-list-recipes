import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{ 
    //Resolver is a data provider that is used with the router to resolve data during navigation
                                                                    
    constructor(private dataStorageService: DataStorageService, private recipesService:RecipeService){}
    //when navigating to the RecipeDetailComponent it will check if their are any recipes and if not get them from the backend
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipesService.getRecipes();
        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }else{
            return recipes;
        }
    }
}