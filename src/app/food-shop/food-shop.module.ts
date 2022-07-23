import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FoodDetailComponent } from "./food-detail/food-detail.component";
import { FoodItemComponent } from "./food-item/food-item.component";
import { FoodListComponent } from "./food-list/food-list.component";
import { FoodShopComponent } from "./food-shop.component";
import { ShopBasketComponent } from './shop-basket/shop-basket.component';
import { BasketItemComponent } from './shop-basket/basket-item/basket-item.component';


@NgModule({
    declarations:[
        FoodShopComponent,
        FoodListComponent,
        FoodDetailComponent,
        FoodItemComponent,
        ShopBasketComponent,
        BasketItemComponent,
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: '', component: FoodShopComponent}])
    ],
    exports:[],
})

export class FoodShopModule{

}