export class ShoppingItems{
    public id: number;
    public name: string;
    public amount: number;
    public imagePath: string;
    public price: number;
    public pricePer: number;
    public type: string;

    constructor(id: number, name: string, amount: number, imagePath: string, price: number, pricePer: number, type: string){
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.imagePath = imagePath;
        this.price = price;
        this.pricePer = pricePer;
        this.type = type;
    }
}