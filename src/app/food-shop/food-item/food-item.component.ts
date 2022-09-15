import { Component, Input, OnInit, OnDestroy, Output } from "@angular/core";
import { ShoppingItems } from "../shopping-items.model";
import { FoodShopService } from "../food-shop.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
    selector: "app-item-item",
    templateUrl: "./food-item.component.html"
})

export class FoodItemComponent implements OnInit, OnDestroy{

    @Input() item:ShoppingItems;
    @Input() index: number;
    @Input() itemAmount: number;

    foodForm: FormGroup;
    showDetails: boolean = false;

    constructor(private foodShopService: FoodShopService){}

    ngOnInit(): void{   
        this.foodForm = new FormGroup({
            'amount': new FormControl('', Validators.required),
        })
    }

    ngOnDestroy():void{

    }

    addToBasket(){
        const item = this.foodShopService.getItem(this.index);
        console.log('Items:', item);
        const amount = this.foodForm.get('amount').value;
        console.log('Amount:', amount);
        !!amount ? item['amount'] = amount : item['amount'] = 1;
        console.log("Items: " , item);
        this.foodShopService.addBasketItem(item);
    }

    toggleDetails(){!this.showDetails;}
}