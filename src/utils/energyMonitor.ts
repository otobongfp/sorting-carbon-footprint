import { performance } from "perf_hooks";
import os from "os";

interface EnergyMetrics {
  time: number;
  energy: number;
  averageLoad: number;
}

export function monitorEnergy(task: () => void): EnergyMetrics {
  // Get initial CPU measurements
  const startTime = performance.now();
  const startCpuInfo = os.cpus();

  // Run the task
  task();

  // Get final CPU measurements
  const endTime = performance.now();
  const endCpuInfo = os.cpus();

  // Calculate time in seconds
  const timeInSeconds = (endTime - startTime) / 1000;

  // Calculate CPU load
  const calculateLoad = (start: os.CpuInfo[], end: os.CpuInfo[]) => {
    return end.map((cpu, i) => {
      const startTotal = Object.values(start[i].times).reduce((a, b) => a + b);
      const endTotal = Object.values(cpu.times).reduce((a, b) => a + b);
      const idle = cpu.times.idle - start[i].times.idle;
      const total = endTotal - startTotal;
      return 1 - idle / total;
    });
  };

  const cpuLoads = calculateLoad(startCpuInfo, endCpuInfo);
  const averageLoad = cpuLoads.reduce((a, b) => a + b) / cpuLoads.length;

  // Estimate power consumption based on CPU load
  // M1 power consumption ranges from ~2W (idle) to ~20W (full load)
  const minPower = 2;
  const maxPower = 20;
  const estimatedPower = minPower + (maxPower - minPower) * averageLoad;

  // Calculate energy in joules (Power * Time)
  const energy = isNaN(estimatedPower) ? 0 : estimatedPower * timeInSeconds;
  return {
    time: endTime - startTime,
    energy,
    averageLoad,
  };
}
