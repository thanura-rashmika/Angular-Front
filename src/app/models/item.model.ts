export class ItemModel {
    code: number;
    name: string;
    price: number;
    qty: number;


    constructor(code: number, name: string, price: number, qty: number) {
        this.code = code;
        this.name = name;
        this.price = price;
        this.qty = qty;
    }
}