import { Basket } from "./src/basket.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const basket = new Basket(1)
  basket.scan('A0001')
  basket.scan('A0001')
  basket.scan('A0002')
  basket.scan('A0002')
  basket.scan('A0003')

  // Prints the basket and
  basket.printItems()

}
