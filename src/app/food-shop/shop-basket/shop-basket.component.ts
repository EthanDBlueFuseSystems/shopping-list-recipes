import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FoodShopService } from '../food-shop.service';
import { ShoppingItems } from '../shopping-items.model';

@Component({
  selector: 'app-shop-basket',
  templateUrl: './shop-basket.component.html',
  styleUrls: ['./shop-basket.component.css']
})
export class ShopBasketComponent implements OnInit, OnDestroy {

    basketSubscription: Subscription;
    basket: ShoppingItems[];

    constructor(private foodShopService: FoodShopService) { 

        this.basketSubscription = this.foodShopService.basketChange.subscribe((basket)=>{
            console.log(basket);
            this.basket = basket;
        })

    }

    ngOnInit(): void {
        this.basket = this.foodShopService.getBasketItems();
    }

    ngOnDestroy(): void{
        this.basketSubscription.unsubscribe()
    }

}
