import { ArticleID, inventory } from "./inventory.ts";
import { promotions } from "./promotions.ts";

export interface BasketItem {
  articleID: ArticleID;
  quantity: number;
}

export class Basket {
  private items: BasketItem[] = [];

  constructor(public readonly id: number) {
  }

  public printItems(): void {
    const detailItems = this.items.map((item) => {
      const promotion = promotions[item.articleID];

      return {
        ...item,
        pricePerItem: inventory[item.articleID],
        priceSum: inventory[item.articleID] * item.quantity,
        reducedPrice: typeof promotion === "function" ? promotion(item) : NaN,
      };
    });

    console.group(`Items in basket with ID "${this.id}"`);
    console.log(`Total basket value: ${this.total()}`);
    console.table(detailItems);
    console.groupEnd();
  }

  public getItems(): BasketItem[] {
    return [...this.items];
  }

  public scan(itemId: ArticleID): void {
    const existingItemIndex = this.items.findIndex((item) =>
      item.articleID === itemId
    );
    if (existingItemIndex >= 0) {
      this.items[existingItemIndex].quantity++;
    } else {
      this.items.push({ articleID: itemId, quantity: 1 });
    }
  }

  public total(): number {
    return this.items.reduce((accumulator, currentValue) => {
      const promotionFn = promotions[currentValue.articleID];

      if (promotionFn) {
        return accumulator + promotionFn(currentValue);
      }

      const inventoryPrice = inventory[currentValue.articleID];

      if (typeof inventoryPrice !== "number") {
        // handle error: no result in inventory list
        return accumulator;
      }
      return accumulator + inventoryPrice * currentValue.quantity;
    }, 0);
  }
}
