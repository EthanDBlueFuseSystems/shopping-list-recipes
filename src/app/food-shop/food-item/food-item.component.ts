import { Component, Input, OnInit, OnDestroy, Output } from "@angular/core";
import { ShoppingItems } from "../shopping-items.model";
import { FoodShopService } from "../food-shop.service";
import { Subject } from "rxjs";

@Component({
    selector: "app-item-item",
    templateUrl: "./food-item.component.html"
})


export class FoodItemComponent implements OnInit, OnDestroy{

    @Input() item:ShoppingItems;
    @Input() index: number;
    @Input() itemAmount: number;

    constructor(private foodShopService: FoodShopService){}

    ngOnInit(): void{
        console.log(this.index);
    }

    ngOnDestroy():void{

    }

    addToBasket(){
        const item = this.foodShopService.getItem(this.index);
        this.foodShopService.addBasketItem(item);
        
    }



}