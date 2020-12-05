const animations = [];

export function getBubbleSort(array) {
  if (array.length <= 1) return array;
  bubbleSort(array);
  return animations;
}

export function getCocktailSort(array) {
  if (array.length <= 1) return array;
  cocktailSort(array);
  return animations;
}

export function getQuickSort(array) {
  quickSort(array, 0, array.length-1);
  return animations;
}

export function getSelectionSort(array) {
  selectionSort(array);
  return animations;
}

export function getBogoSort(array) {
  bogoSort(array);
  return animations;
}

export function getMergeSort(array) {
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSort(array, 0, array.length - 1, auxiliaryArray);
  return animations;
}

function swap(
  i, j, array
) {
  let tmp = array[i];
  array[i] = array[j];
  animations.push([i, array[j]]);
  array[j] = tmp;
  animations.push([j, tmp]);
return array;
}

function selectionSort(array) {
  for (var i = 0; i < array.length; i++){
    let min = i;
    for(let j = i+1; j < array.length; j++){
      swap(j, j, array)
      if(array[j] < array[min]) {
        min = j;
      }
    }
    swap(i, min, array)
  }
}

function bogoSort(array) {
  function isSorted (array){
        for(var i = 1; i < array.length; i++){
            if (array[i-1] > array[i]) {
                return false;
            }
        }
        return true;
    };

  function shuffle(array){
        var count = array.length, index;
        while(count > 0){
            index = Math.floor(Math.random() * array.length);
            count--;
            array = swap(count, index, array)
        }
        return array;
  }

   function sort(array){
        var sorted = false;
        const max_tries = 500;
        var count = 0;
        while(!sorted && (count<max_tries)){
            array = shuffle(array);
            sorted = isSorted(array);
            count ++;
        }
        return array;
    }

    return sort(array);
}

function quickSort(array, left, right) {
  function partition(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)],
      i = left, j = right;
    while (i <= j) {
      while (array[i] < pivot){
        array = swap(i, i, array);
        i++;
      }
      while (array[j] > pivot){
        array = swap(i, i, array);
        j--;
      }
      if (i <= j){
        array = swap(i, j, array);
        i++; j--;
      }
    }
    return i;
  }

  var index;
  if (array.length > 1) {
    index = partition(array, left, right)
    if (left < index - 1) {
      quickSort(array, left, index-1)
    }
    if (right > index) {
      quickSort(array, index, right)
    }
  }
}

function cocktailSort(array) {

    let n = array.length;
    let sorted = false;
    console.log(n)

    while (!sorted) {
        sorted = true;
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]){
              array = swap(i, i+1, array)
               sorted = false;
            }
            else {
              array = swap(i, i, array)
            }

   }

   if (sorted)
       break;
   sorted = true;

        for (let j = n - 1; j > 0; j--) {
            if (array[j-1] > array[j]) {
                array = swap(j, j-1, array)
                sorted = false;
            }
            else {
                array = swap(j, j, array)
            }
        }
    }
}

function bubbleSort(
  array,
) {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        array = swap(j, j+1, array)
      }
      else {
        array = swap(j, j, array)
      }
    }
  }
}

function mergeSort(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray);
  mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
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
