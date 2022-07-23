import { Component, OnInit, Input } from '@angular/core';
import { ShoppingItems } from '../../shopping-items.model';
import { FoodShopService } from '../../food-shop.service';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent implements OnInit {

    @Input() item:ShoppingItems;
    @Input() index: number;

  constructor(private foodShopservice:FoodShopService) { }

  ngOnInit(): void {

  }

  isLastItem(): boolean {
    const basketItems = this.foodShopservice.getBasketItems();
    return (basketItems.length - 1) === this.index ? true : false;
  }

}
