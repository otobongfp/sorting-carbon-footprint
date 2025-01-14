import fs from "fs";
import path from "path";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";
import { heapSort } from "./algorithms/heapSort";
import { linearSearch } from "./algorithms/linearSearch";
import { binarySearch } from "./algorithms/binarySearch";
import { monitorEnergy } from "./utils/energyMonitor";
import chalk from "chalk";

const EMISSION_FACTOR = 0.475; // kgCO₂/kWh

function calculateCarbonFootprint(energyJoules: number): number {
  const energyKWh = energyJoules / 3.6e6; // Convert joules to kWh
  return energyKWh * EMISSION_FACTOR;
}

// dataset read func
function loadDataset(name: string): number[] {
  const datasetPath = path.join(__dirname, "../dataset", `${name}.json`);
  if (!fs.existsSync(datasetPath)) {
    throw new Error(
      chalk.red(`Dataset file ${name}.json not found in /dataset folder.`)
    );
  }
  const data = fs.readFileSync(datasetPath, "utf8");
  return JSON.parse(data);
}

// Load datasets
const dataset = loadDataset("dataset_20000000");
const target = dataset[Math.floor(Math.random() * dataset.length)];
console.log(chalk.blue(`TARGET: ${target}`));

// Benchmark LinearSearch
console.log(chalk.blue("Benchmarking LinearSearch..."));
const linearSearchResult = monitorEnergy(() => linearSearch(dataset, target));
console.log(
  chalk.green(
    `LinearSearch - Time Taken: ${linearSearchResult.time.toFixed(2)}ms`
  )
);
console.log(
  chalk.yellow(
    `LinearSearch - Energy Estimate: ${linearSearchResult.energy.toFixed(4)} J`
  )
);
console.log(
  chalk.cyan(
    `LinearSearch - Carbon Footprint: ${calculateCarbonFootprint(
      linearSearchResult.energy
    ).toFixed(6)} kgCO₂\n`
  )
);

// Benchmark BinarySearch
console.log(chalk.blue("Benchmarking BinarySearch..."));
const sortedDataset = [...dataset].sort((a, b) => a - b);
const binarySearchResult = monitorEnergy(() =>
  binarySearch(sortedDataset, target)
);
console.log(
  chalk.green(
    `BinarySearch - Time Taken: ${binarySearchResult.time.toFixed(2)}ms`
  )
);
console.log(
  chalk.yellow(
    `BinarySearch - Energy Estimate: ${binarySearchResult.energy.toFixed(4)} J`
  )
);
console.log(
  chalk.cyan(
    `BinarySearch - Carbon Footprint: ${calculateCarbonFootprint(
      binarySearchResult.energy
    ).toFixed(6)} kgCO₂\n`
  )
);

// Benchmark QuickSort
console.log(chalk.blue("Benchmarking QuickSort..."));
const quickSortResult = monitorEnergy(() => quickSort([...dataset]));
console.log(
  chalk.green(`QuickSort - Time Taken: ${quickSortResult.time.toFixed(2)}ms`)
);
console.log(
  chalk.yellow(
    `QuickSort - Energy Estimate: ${quickSortResult.energy.toFixed(4)} J`
  )
);
console.log(
  chalk.cyan(
    `QuickSort - Carbon Footprint: ${calculateCarbonFootprint(
      quickSortResult.energy
    ).toFixed(6)} kgCO₂\n`
  )
);

// Benchmark HeapSort
console.log(chalk.blue("Benchmarking HeapSort..."));
const heapSortResult = monitorEnergy(() => heapSort([...dataset]));
console.log(
  chalk.green(`HeapSort - Time Taken: ${heapSortResult.time.toFixed(2)}ms`)
);
console.log(
  chalk.yellow(
    `HeapSort - Energy Estimate: ${heapSortResult.energy.toFixed(4)} J`
  )
);
console.log(
  chalk.cyan(
    `HeapSort - Carbon Footprint: ${calculateCarbonFootprint(
      heapSortResult.energy
    ).toFixed(6)} kgCO₂\n`
  )
);

// Benchmark MergeSort
console.log(chalk.blue("Benchmarking MergeSort..."));
const mergeSortResult = monitorEnergy(() => mergeSort([...dataset]));
console.log(
  chalk.green(`MergeSort - Time Taken: ${mergeSortResult.time.toFixed(2)}ms`)
);
console.log(
  chalk.yellow(
    `MergeSort - Energy Estimate: ${mergeSortResult.energy.toFixed(4)} J`
  )
);
console.log(
  chalk.cyan(
    `MergeSort - Carbon Footprint: ${calculateCarbonFootprint(
      mergeSortResult.energy
    ).toFixed(6)} kgCO₂\n`
  )
);
