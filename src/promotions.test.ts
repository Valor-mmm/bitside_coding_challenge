import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import {ApplyPromotion, promotions} from "./promotions.ts";


describe("Promotions", () => {

    describe("Percentage", () => {
        const promotionFn = promotions['A0001'] as ApplyPromotion

        it('should calculate the promotion correctly for one product', () => {
            expect(promotionFn({articleID: 'A0001', quantity: 1})).toEqual(11.691)
        })

        it('should calculate the promotion correctly for three products', () => {
            expect(promotionFn({articleID: 'A0001', quantity: 3})).toEqual(35.073)

        })
    })

    describe("TwoForOne", () => {

        const promotionFn = promotions['A0002'] as ApplyPromotion

        it('should not reduce the price for one product', () => {
            expect(promotionFn({articleID: 'A0002', quantity: 1})).toEqual(22.99)
        })

        it('should reduce the price for two products', () => {
            expect(promotionFn({articleID: 'A0002', quantity: 2})).toEqual(22.99)
        })

        it('should only reduce one product from the price for three products', () => {
            expect(promotionFn({articleID: 'A0002', quantity: 3})).toBeCloseTo(45.98)
        })
    })

})