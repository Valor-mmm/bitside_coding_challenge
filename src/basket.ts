import {ArticleID} from "./inventory.ts";

export interface BasketItem {
    articleID: ArticleID;
    quantity: number;
}

export class Basket {
    private items: BasketItem[]= []

    constructor(public readonly id: number) {

    }

    public printItems(): void {
        console.group(`Items in basket with ID "${this.id}"`)
        console.table(this.items);
        console.groupEnd();
    }

    public getItems(): BasketItem[] {
        return [...this.items];
    }

    public scan(itemId: ArticleID): void {
        const existingItemIndex = this.items.findIndex((item) => item.articleID === itemId);
        if (existingItemIndex >= 0) {
            this.items[existingItemIndex].quantity++;
        } else {
            this.items.push({articleID: itemId, quantity: 1});
        }
    }
}