const animations = [];

export function getBubbleSort(array) {
  if (array.length <= 1) return array;
  bubbleSort(array);
  return animations;
}

export function getCombSort(array) {
  if (array.length <= 1) return array;
  combSort(array);
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

export function getInsertionSort(array) {
  insertionSort(array, 0, array.length);
  return animations;
}

export function getShellSort(array) {
  shellSort(array);
  return animations;
}

export function getBogoSort(array) {
  bogoSort(array);
  return animations;
}

export function getHeapSort(array) {
  heapSort(array, 0, array.length);
  return animations;
}

export function getIntroSort(array) {
  introSort(array);
  return animations;
}

export function getMergeSort(array) {
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSort(array, 0, array.length - 1, auxiliaryArray);
  return animations;
}

function swap(i, j, array) {
  let tmp = array[i];
  array[i] = array[j];
  animations.push([i, array[j]]);
  array[j] = tmp;
  animations.push([j, tmp]);
  return array;
}

var size_threshold = 16;
function introSort(array){
  function floor_lg(array) {
      return (Math.floor(Math.log(array)/Math.log(2))) << 0;
  }
  introsort_loop(array, 0, array.length, 2 * floor_lg(array.length));
}

function introsort_loop (array, left, right, depth_limit) {
    while (right-left > size_threshold) {
        if (depth_limit === 0) {
            heapSort(array, left, right);
            return;
        }
        depth_limit=depth_limit-1;
        var p = partition(array, left, right-1);
        introsort_loop(array, p, right, depth_limit);
        right = p;
    }
    insertionSort(array, left, right);
}

function heap_root(array, i, left, right) {
  var left_child = 2 * (i-left) + 1 + left;
  var right_child = 2 * (i-left) + 2 + left;
  var max = i;
  if (left_child < right && array[left_child] > array[max]) {
      max = left_child;
  }
  if (right_child < right && array[right_child] > array[max])     {
      max = right_child;
  }
  swap(i, max, array);
  if (max !== i) {
      heap_root(array, max, left, right);
  }
}

function heapSort(array, left, right) {
  for (var i = left+Math.ceil((right-left)/2); i >= left; i -= 1)      {
      heap_root(array, i, left, right);
  }
  for (i = right-1; i >= left; i--) {
      swap(left, i, array);
      heap_root(array, left, left, i);
  }
}

function selectionSort(array) {
  for (var i = 0; i < array.length; i++){
    let min = i;
    for(let j = i+1; j < array.length; j++){
      /* swap(j, j, array) */
      if(array[j] < array[min]) {
        min = j;
      }
    }
    swap(i, min, array)
  }
}

function insertionSort(array, left, right) {
        for (let i = left+1; i < right; i++) {
            let j = i;
            while ((j > left) && (array[j-1] > array[j])) {
		array = swap(j-1, j, array)
                j--;
            }
        }
    return array;
}

function shellSort (array) {
    for (var h = array.length; h > 0; h = parseInt(h / 2)) {
        for (var i = h; i < array.length; i++) {
            for (var j = i; j >= h && array[j] < array[j - h]; j -= h)
		array = swap(j-h, j, array)
        }
    }
    return array;
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
    sort(array);
}

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

function quickSort(array, left, right) {
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
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]){
              array = swap(i, i+1, array)
               sorted = false;
            } else {
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

function combSort(array){
  var interval = Math.floor(array.length/1.3);
  while (interval > 0) {
    for(var i=0; i+interval<array.length; i+=1) {
      if (array[i] > array[i+interval]) {
	array = swap(i, i+interval, array)
      }else {
	array = swap(i, i, array)
      }
    }
    interval = Math.floor(interval/1.3);
  }
}

function bubbleSort(array) {
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
