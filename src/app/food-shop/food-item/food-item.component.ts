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

    constructor(private foodShopService: FoodShopService){}

    ngOnInit(): void{   
        this.foodForm = new FormGroup({
            'amount': new FormControl('', Validators.required),
        })
    }

    ngOnDestroy():void{

    }

    addToBasket(){
        let item = this.foodShopService.getItem(this.index);
        const amount = this.foodForm.get('amount').value;
        if(amount==='') {item['amount'] = 1}
        else{item['amount'] = amount }
        
        this.foodShopService.addBasketItem(item);
    }



}