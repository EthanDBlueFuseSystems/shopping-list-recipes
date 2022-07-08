import { Component, OnInit, OnDestroy } from "@angular/core";
import { FoodShopService } from "../food-shop.service";
import { Subscription } from "rxjs";
import { ShoppingItems } from "../shopping-items.model";

@Component({
    selector: 'app-food-list',
    templateUrl: './food-list.component.html',
})

export class FoodListComponent implements OnInit, OnDestroy{

    // foodSubscription: Subscription;//create subscription to unsubscribe from

    shoppingItems: ShoppingItems[];

    constructor(private shoppingItemsService: FoodShopService){}

    ngOnInit(): void {
        console.log("FoodList");
        this.shoppingItems = this.shoppingItemsService.getShoppingItems();
        // this.foodSubscription = this.shoppingItemsService.shoppingItemsChange.subscribe((shoppingItems) => {//listen to a change event 
        //     console.log("foodSubscription");
        //     this.shoppingItems = this.shoppingItemsService.getShoppingItems();
        // })
    }

    ngOnDestroy(): void{
        // this.foodSubscription.unsubscribe(); //need to unsubscribe when changing components to prevent memory leak
    }

}