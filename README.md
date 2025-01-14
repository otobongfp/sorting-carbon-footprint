# **Sorting Algorithms Energy Benchmark**

This project benchmarks various sorting and searching algorithms while estimating their energy consumption on M1 machines. It provides insights into runtime efficiency and energy impact for different algorithms and dataset sizes.

---

## **Getting Started**

### **Usage**

1. **Generate Test Data**  
   Create datasets of varying sizes for use in benchmarks:

   ```bash
   npx ts-node src/generateData.ts
   ```

2. **Run Benchmark Tests**  
   Execute the benchmarks to measure runtime and energy consumption:
   ```bash
   npx ts-node src/index.ts
   ```

---

### **Installation**

To set up the project, install the required dependencies:

```bash
npm install --save-dev typescript @types/node ts-node os chalk@4.1.2
```

---

### **Monitoring Energy Consumption on M1**

Use macOS's built-in `powermetrics` tool to monitor real-time energy usage for CPU and GPU on M1 machines:

```bash
sudo powermetrics --samplers cpu_power,gpu_power -i 1000
```

#### **Explanation**:

- **`--samplers cpu_power,gpu_power`**: Monitors power usage for CPU and GPU.
- **`-i 1000`**: Sets a 1-second interval between samples.

#### **What output on the console looks like**:

```
Benchmarking QuickSort...
QuickSort - Time Taken: 6023.59ms
QuickSort - Energy Estimate: 78.1853 J
QuickSort - Carbon Footprint: 0.000010 kgCO₂
```

---

## **Features**

- Benchmarks key algorithms:
  - **Sorting**: MergeSort, QuickSort, HeapSort.
  - **Searching**: LinearSearch, BinarySearch.
- Estimates energy usage based on execution time and CPU load.
- Enables real-time energy monitoring on M1 systems.

---

## **Future Enhancements**

- Add support for additional algorithms (e.g., BubbleSort, RadixSort).
- Incorporate more detailed energy profiling tools.

---

## **Contributing**

Contributions are welcome! Feel free to fork the repository, submit pull requests, or open issues to suggest improvements.
