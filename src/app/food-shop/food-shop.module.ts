import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FoodDetailComponent } from "./food-detail/food-detail.component";
import { FoodItemComponent } from "./food-item/food-item.component";
import { FoodListComponent } from "./food-list/food-list.component";
import { FoodShopComponent } from "./food-shop.component";

@NgModule({
    declarations:[
        FoodShopComponent,
        FoodListComponent,
        FoodDetailComponent,
        FoodItemComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: FoodShopComponent}])
    ],
    exports:[],
})

export class FoodShopModule{

}