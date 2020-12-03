export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  return animations;
}

export function getCocktailSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  cocktailSort(array, animations);
  return animations;
}

export function getQuickSortAnimations(array) {
  const animations = [];
  quickSort(array, animations, 0, array.length-1);
  return animations;
}

export function getBogoSortAnimations(array) {
  const animations = [];
  bogoSort(array, animations);
  return animations;
}

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSort(array, 0, array.length - 1, auxiliaryArray, animations);
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

function bogoSort(array, animations) {
  function isSorted (array){
        for(var i = 1; i < array.length; i++){
            if (array[i-1] > array[i]) {
                return false;
            }
        }
        return true;
    };

  function shuffle(array, animations){
        var count = array.length, index;
        while(count > 0){
            index = Math.floor(Math.random() * count);
            count--;
            [array, animations] = swap(count, index, array, animations)
        }
        return array;
  }

   function sort(array){
        var sorted = false;
        const max_tries = 500;
        var count = 0;
        while(!sorted && (count<max_tries)){
            array = shuffle(array, animations);
            sorted = isSorted(array);
            count ++;
        }
        return array;
    }

    return sort(array);
}

function quickSort(array, animations, left, right) {
  function partition(array, animations, left, right) {
    var pivot = array[Math.floor((right + left) / 2)],
      i = left, j = right;
    while (i <= j) {
      while (array[i] < pivot){
        [array, animations] = swap(i, i, array, animations);
        i++;
      }
      while (array[j] > pivot){
        [array, animations] = swap(i, i, array, animations);
        j--;
      }
      if (i <= j){
        [array, animations] = swap(i, j, array, animations);
        i++; j--;
      }
    }
    return i;
  }

  var index;
  if (array.length > 1) {
    index = partition(array, animations, left, right)
    if (left < index - 1) {
      quickSort(array, animations, left, index-1)
    }
    if (right > index) {
      quickSort(array, animations, index, right)
    }
  }
}

function cocktailSort(array, animations) {

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
            else {
              [array, animations] = swap(i, i, array, animations)
            }

   }

   if (sorted)
       break;
   sorted = true;

        for (let j = n - 1; j > 0; j--) {
            if (array[j-1] > array[j]) {
                [array, animations] = swap(j, j-1, array, animations)
                sorted = false;
            }
            else {
                [array, animations] = swap(j, j, array, animations)
            }
        }
    }
}

function bubbleSort(
  array,
  animations,
) {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array, animations] = swap(j, j+1, array, animations)
      }
      else {
        [array, animations] = swap(j, j, array, animations)
      }
    }
  }
}

function mergeSort(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
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
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
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
