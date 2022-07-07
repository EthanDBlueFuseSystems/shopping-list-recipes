import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ShoppingItems } from "../shopping-items.model";


@Component({
    selector: "app-item-item",
    templateUrl: "./food-item.component.html"
})


export class FoodItemComponent implements OnInit, OnDestroy{

    @Input() item:ShoppingItems;
    @Input() index: number;

    constructor(){}

    ngOnInit(): void{

    }

    ngOnDestroy():void{

    }


}