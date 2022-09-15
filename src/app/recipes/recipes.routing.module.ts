import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeResolverService } from "./recipes-resolver.service";

//canActivate: [AuthGuard],
const routes:Routes = [
    {path: '', component:RecipesComponent, children:[   
        {path:'', component: RecipeStartComponent},
        {path:'new', component: RecipeEditComponent},
        {path:':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path:':id/edit', component: RecipeEditComponent},
    ]},
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]

})

export class RecipesRoutingModule{

}