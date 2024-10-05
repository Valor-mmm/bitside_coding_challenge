import { assertEquals } from "jsr:@std/assert";
import {Basket} from "./src/basket.ts";

Deno.test({
    name: 'Test basket and promotion functionality',
    async fn(t) {
        let basket: Basket
        await t.step("initialize a basket", () => {
            basket = new Basket(1);
            assertEquals(basket.id, 1)
        })

        await t.step("add products to the basket", () => {
            basket.scan('A0001')
            basket.scan('A0002')
            basket.scan('A0002')
            basket.scan('A0002')

            assertEquals(basket.getItems(), [
                {articleID: "A0001", quantity: 1},
                {articleID: "A0002", quantity: 3},
            ])
        })

        await t.step("get the expected total with reductions", () => {
            basket.scan('A0003')
            assertEquals(basket.total(), 90.661)
        })
    }
})