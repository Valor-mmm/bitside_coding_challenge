# Bitside Coding Challenge

This is an implementation of the
[bitside coding challenge](https://gist.github.com/N3mezis/e058340930a385d4d4aac513cd0f1c1a#file-codingchallenge-md)
required during the hiring process of the company https://bitside.de/.

## Getting started

The challenge is implemented in TypeScript with [deno](https://deno.com/).
However, the file should also be able to be run in node (with a tsc beforehand).

### Using deno

- Install deno on your machine if not already present:
  https://docs.deno.com/runtime/getting_started/installation/
- Run `deno install` to install all used dependencies
- Run `deno run main.ts` in the root directory to execute the script
- run `deno test` in the root directory to run all tests

### Using node

**⚠️ Disclaimer: I did not test this** If you want to run those files in node
instead of deno:

- remove the deno specific code (one line) from the main.ts
- execute `tsc --init`
- adjust the tsconfig.json if necessary (e.g. root of project)
- execute `tsc`
- run the tsc output with node (`node main.js`)

## Usage

See the main.ts file for an example.

The current process for the basket usage is as follows:

### 1. Create a basket with the desired id

```typescript
const basket = new Basket(5);
```

### 2. Add products to the basket using the scan function

Note: Scanning a product twice will increase the quantity in the basket

```typescript
basket.scan("A0001");
basket.scan("A0001");
basket.scan("A0002");
basket.scan("A0002");
basket.scan("A0003");
```

### 3. Calculate the total sum of the basket using

```typescript
console.log(basket.total()); // 79.362
```

### 4. Verify the basket items and total price

```typescript
basket.printItems();
/*
     Total basket value: 79.362
    ┌───────┬───────────┬──────────┬──────────────┬──────────┬──────────────┐
    │ (idx) │ articleID │ quantity │ pricePerItem │ priceSum │ reducedPrice │
    ├───────┼───────────┼──────────┼──────────────┼──────────┼──────────────┤
    │     0 │ "A0001"   │        2 │ 12.99        │ 25.98    │ 23.382       │
    │     1 │ "A0002"   │        2 │ 22.99        │ 45.98    │ 22.99        │
    │     2 │ "A0003"   │        1 │ 32.99        │ 32.99    │ NaN          │
    └───────┴───────────┴──────────┴──────────────┴──────────┴──────────────┘
**/
```
