import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import {Basket} from "./basket.ts";

describe("Basket", () => {
    it("should have a fixed id", () => {
        const basket = new Basket(0);
        expect(basket.id).toEqual(0);
    })

    it("Should be able to add items to the basket", () => {
        const basket = new Basket(0);

        basket.scan('A0001')
        basket.scan('A0002')
        basket.scan('A0002')
        basket.scan('A0003')

        expect(basket.getItems()).toEqual([
            {articleID: "A0001", quantity: 1},
            {articleID: "A0002", quantity: 2},
            {articleID: "A0003", quantity: 1},
        ])
    })
})