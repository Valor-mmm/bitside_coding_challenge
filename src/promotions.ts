import {ArticleID, inventory} from "./inventory.ts";
import {BasketItem} from "./basket.ts";

export type ApplyPromotion = (basketItem: BasketItem) => number;

/**
 * Reduces the price by the reduction provided:
 * e.g.:
 *
 * reduction: 0.1 && price: 10 -> reduced price: 9
 * */
const getReductionPromotion = (reduction: number): ApplyPromotion => (basketItem) => {
    const inventoryPrice = inventory[basketItem.articleID]

    if (typeof inventoryPrice !== "number") {
       // handle error: no result in inventory list
       return 0
    }

    return (inventoryPrice * (1 - reduction)) * basketItem.quantity
}

/**
 * Only offers reduction for the first two equal items.
 * E.g.
 *  - 2 Articles -> Pay 1
 *  - 3 Articles -> Pay 2
 *  - 4 Articles -> Pay 3
 * */
const getTwoForOnePromotion = (): ApplyPromotion => (basketItem) => {
    const inventoryPrice = inventory[basketItem.articleID]

    if (typeof inventoryPrice !== "number") {
        // handle error: no result in inventory list
        return 0
    }

    const totalPrice = inventoryPrice * basketItem.quantity

    if (basketItem.quantity >= 2) {
        return totalPrice - inventoryPrice
    }
    return totalPrice
}

export const promotions: Partial<Record<ArticleID, ApplyPromotion>> = {
    'A0001': getReductionPromotion(0.1),
    'A0002': getTwoForOnePromotion()
}