import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
    {
        path: '', 
        redirectTo: '/recipes', 
        pathMatch: 'full'
    },
    {
        path: 'recipes', 
        loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule) 
    },
    {
        path:'shopping-list', 
        loadChildren: () => import('./shopping-list/shopping-list.module').then(x => x.ShoppingListModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule),
    },
    {
        path: 'shop',
        loadChildren: () => import('./food-shop/food-shop.module').then(x => x.FoodShopModule),
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin-panel/admin-panel.module').then(x=> x.AdminPanelModule), //pointing to the admin panel module to load comopnents
    }
]
    
@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports:[RouterModule]
})

export class AppRoutingModule{

}