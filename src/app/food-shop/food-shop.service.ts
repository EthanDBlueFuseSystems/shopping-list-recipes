import { Injectable, OnInit } from "@angular/core";
import { ShoppingItems } from "./shopping-items.model";

import { Subject } from "rxjs";


@Injectable({providedIn: 'root'})




export class FoodShopService implements OnInit{

    shoppingItemsChange = new Subject<ShoppingItems[]>();
    basketChange = new Subject<ShoppingItems[]>();

    private shoppingItems:ShoppingItems[] = [
        new ShoppingItems(0,'Bananas', 5, 'https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg', 1.0, 0.2, 'fruit'),
        new ShoppingItems(1,'Apples', 6, 'https://images.ctfassets.net/6jpeaipefazr/4hOJ14xYUKrZMMfhAnRUjT/d51cffa4b8012ffae80e250d10121e9e/P14-British-Apples.jpg?fm=jpg&fl=progressive&q=60&w=400&h=400&fit=scale', 1.0, 0.2, 'fruit'),
        new ShoppingItems(2,'Pears', 6, 'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/pears-28f8900.jpg?quality=90&resize=385%2C350', 1.0, 0.2, 'fruit'),
        new ShoppingItems(3,'Oranges', 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/1200px-Oranges_-_whole-halved-segment.jpg', 1.0, 0.2, 'fruit'),
        new ShoppingItems(4,'Pineapples', 1, 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2022%2F06%2F07%2Fhow-to-store-pineapple.jpg&q=60', 1.0, 0.2, 'fruit'),
        new ShoppingItems(5,'Mangos', 4, 'https://images.ctfassets.net/6jpeaipefazr/MtzpPUIuo7TZHCJTyqjGw/0f9808cd4cdae89d9f8facabba2360a6/1000x1000-Mango.jpg', 1.0, 0.2, 'fruit'),
        new ShoppingItems(6, 'Ground Beef', 3, 'https://embed.widencdn.net/img/beef/4hh1pywcnj/exact/Grind_Fine_85.psd?keep=c&u=7fueml', 4.0, 1.0, 'meat'),
        
    ];

    private basket:ShoppingItems[] = [
        new ShoppingItems(6, 'Ground Beef', 3, 'https://embed.widencdn.net/img/beef/4hh1pywcnj/exact/Grind_Fine_85.psd?keep=c&u=7fueml', 4.0, 1.0, 'meat'),
    ]

    ngOnInit():void {
    }

    getItem(id: number){
        return this.shoppingItems[id];
    }

    getShoppingItems(){
        return this.shoppingItems.slice(); //take a copy of the shoppingItems
    }

    addShoppingItems(item: ShoppingItems){
        this.shoppingItems.push(item);
        this.shoppingItemsChange.next(this.shoppingItems.slice()); //listen event to update shoopingItems on a component
    }

    addBasketItem(item: ShoppingItems){
        this.basket.push(item);
        this.basketChange.next(this.basket.slice()); //listen event to update
    }

    getBasketItems(){
        return this.basket.slice();
    }


}