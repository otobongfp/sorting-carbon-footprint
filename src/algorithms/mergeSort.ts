// export function mergeSort(arr: number[]): number[] {
//   if (arr.length <= 1) return arr;

//   const mid = Math.floor(arr.length / 2);
//   const left = mergeSort(arr.slice(0, mid));
//   const right = mergeSort(arr.slice(mid));

//   return merge(left, right);
// }

// function merge(left: number[], right: number[]): number[] {
//   let sorted: number[] = [];
//   while (left.length && right.length) {
//     sorted.push(left[0] < right[0] ? left.shift()! : right.shift()!);
//   }
//   return [...sorted, ...left, ...right];
// }

export function mergeSort(arr: number[]): number[] {
  // Create auxiliary array once for the entire sort
  const aux = arr.slice(0);

  function mergeSortHelper(
    arr: number[],
    aux: number[],
    low: number,
    high: number
  ): void {
    if (low >= high) return;

    const mid = Math.floor(low + (high - low) / 2);

    mergeSortHelper(arr, aux, low, mid);
    mergeSortHelper(arr, aux, mid + 1, high);
    merge(arr, aux, low, mid, high);
  }

  function merge(
    arr: number[],
    aux: number[],
    low: number,
    mid: number,
    high: number
  ): void {
    // Copy to auxiliary array
    for (let k = low; k <= high; k++) {
      aux[k] = arr[k];
    }

    let i = low;
    let j = mid + 1;

    // Merge back to original array
    for (let k = low; k <= high; k++) {
      if (i > mid) {
        arr[k] = aux[j++];
      } else if (j > high) {
        arr[k] = aux[i++];
      } else if (aux[i] <= aux[j]) {
        arr[k] = aux[i++];
      } else {
        arr[k] = aux[j++];
      }
    }
  }

  mergeSortHelper(arr, aux, 0, arr.length - 1);
  return arr;
}
