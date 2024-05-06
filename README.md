# Modern TypeScript Benchmarking in a Browser Environment

[Very recently](https://github.com/vitest-dev/vitest/issues/5041#event-12641536120), Vitest devs solved a compatibility issue between the Vitest experimental [**Browser Mode**](https://vitest.dev/guide/browser) and Vitest experimental [**Benchmarking Feature**](https://vitest.dev/guide/features#benchmarking). I wanted to give it a try and the result is great: It is finally very easy to properly **benchmark TypeScript code in a browser environment**.

This project demonstrates how to set up and run benchmarks for TypeScript functions in a headless browser environment using Vitest and Playwright. It demonstrates it by comparing two different methods for drawing rectangles on a canvas.

## Getting Started

Ensure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).

1. Clone the repository:

   ```bash
   git clone git@github.com:jacomyal/canvas-benchmark
   cd canvas-benchmark
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. If you did not use Playwright recently, you need to install the proper headless browsers:

   ```bash
   npx playwright install
   ```

## Example

Run the interactive example to check that the two functions work properly:

```bash
npm run start
```

You can also build the example running:

```bash
npm run build
```

## Unit Tests

Run the unit tests defined in `src/index.spec.ts` in a browser environment and output the results:

```bash
npm run test
```

## Benchmark

Run the benchmark defined in `src/index.bench.ts` in a browser environment and output the results:

```bash
npm run bench
```

You should see an output looking like:

```
RERUN  src/index.bench.ts x3
✓ src/index.bench.ts (2) 6405ms
  ✓ Canvas methods to draw a thick line (2) 6401ms
    name                             hz     min       max    mean     p75     p99    p995    p999       rme  samples
  · Using a filled rectangle  20,836.25  0.0000  1,299.90  0.0480  0.0000  0.1000  0.1000  0.1000  ±182.26%    29127
  · Using a wide stroke       22,818.67  0.0000  1,581.90  0.0438  0.0000  0.1000  0.1000  0.1000  ±188.92%    37450   fastest

BENCH  Summary
 Using a wide stroke - src/index.bench.ts > Canvas methods to draw a thick line
   1.10x faster than Using a filled rectangle

PASS  Waiting for file changes...
      press h to show help, press q to quit
```
