export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, animations);
  return animations;
}

export function getCocktailSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  cocktailSortHelper(array, animations);
  return animations;
}

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function swap(
  i, j, array, animations
) {
  let tmp = array[i];
  array[i] = array[j];
  animations.push([i, array[j]]);
  array[j] = tmp;
  animations.push([j, tmp]);
return [array, animations];
}

function cocktailSortHelper(array, animations) {

    let n = array.length;
    let sorted = false;
    console.log(n)

    while (!sorted) {
        sorted = true;
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]){
		[array, animations] = swap(i, i+1, array, animations)
               sorted = false;
            }
   }

   if (sorted)
       break;
   sorted = true;

        for (let j = n - 1; j > 0; j--) {
            if (array[j-1] > array[j]) {
		[array, animations] = swap(j, j+1, array, animations)
                sorted = false;
            }
        }
    }
}

function bubbleSortHelper(
  array,
  animations,
) {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
	[array, animations] = swap(j, j+1, array, animations)
      }
    }
  }
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
