import fs from "fs";
import path from "path";

function generateDataset(size: number): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * 1000000)
  );
}

function saveDataset(name: string, data: number[]): void {
  const datasetPath = path.join(__dirname, "../dataset", `${name}.json`);
  fs.writeFileSync(datasetPath, JSON.stringify(data, null, 2), "utf8");
  console.log(`Dataset saved: ${datasetPath}`);
}

const datasetFolder = path.join(__dirname, "../dataset");
if (!fs.existsSync(datasetFolder)) {
  fs.mkdirSync(datasetFolder);
  console.log(`Folder created: ${datasetFolder}`);
}

// Generate datasets of varying sizes
const sizes = [100000, 1000000, 10000000, 20000000];
sizes.forEach((size) => {
  const dataset = generateDataset(size);
  saveDataset(`dataset_${size}`, dataset);
});
