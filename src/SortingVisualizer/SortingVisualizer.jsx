import React from 'react';
import Select from 'react-select';
import 'react-dropdown/style.css';
import * as sorting from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const algorithms = [
  { value: sorting.getMergeSort, label: 'Merge Sort' },
  { value: sorting.getQuickSort, label: 'Quick Sort' },
  { value: sorting.getSelectionSort, label: 'Selection Sort' },
  { value: sorting.getCocktailSort, label: 'Cocktail Shaker Sort' },
  { value: sorting.getBubbleSort, label: 'Bubble Sort' },
  { value: sorting.getBogoSort, label: 'Bogo Sort' },
  { value: sorting.getHeapSort, label: 'Heap Sort' },
];

const arrays = [
  { value: randomArray, label: 'Random Array' },
  { value: reversedArray, label: 'Reversed Array' },
  { value: nearlySorted, label: 'Almost Sorted Array' },
];

const ANIMATION_SPEED_MS = 0.1;
const NUMBER_OF_ARRAY_BARS = 610;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      sortingAlgorithm: null,
    };
  }

  selectAlgorithm = sortingAlgorithm => {
    this.setState(
      { sortingAlgorithm: sortingAlgorithm },
    );
  };

  chooseArray(arrayFunc) {
	  console.log(arrayFunc)
    var func = arrayFunc.value
	  console.log(func)
    const array = func()
    this.setState({array});
  }

  sort() {
    var algorithm = this.state.sortingAlgorithm.value;
    const animations = algorithm(this.state.array);
    play_animations(animations);
  }

  componentDidMount() {
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
	<Select
          onChange={this.selectAlgorithm}
          options={algorithms}
	  placeholder='Select Sorting Algorithm'
        />
        <button onClick={() => this.sort()}>Sort</button>
	<Select
          onChange={(e) => this.chooseArray(e)}
          options={arrays}
	  placeholder='Select Starting Array'
        />
	<br/>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: `hsl(${value}, 100%, 50%)`,
              height: `500px`,
            }}></div>
        ))}
	<br/>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function play_animations (animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations.shift();
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = `hsl(${newHeight}, 100%, 50%)`;
        }, i * ANIMATION_SPEED_MS);
      }
}

function randomArray() {
  const array = [];
  for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
    array.push(randomIntFromInterval(0, 360));
  }
  return array
}

function reversedArray() {
  const array = [];
  for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
    array.push(randomIntFromInterval(1, 359));
  }
  array.sort(function(a, b){return a - b});
  array.reverse();
  return array
}

function nearlySorted() {
  const array = [];
  for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
    array.push(randomIntFromInterval(1, 359));
  }
  array.sort(function(a, b){return a - b});
  for (let k = 0; k < 10; k++) {
    const i = randomIntFromInterval(0, NUMBER_OF_ARRAY_BARS)
    const j = randomIntFromInterval(0, NUMBER_OF_ARRAY_BARS)
    swap(i, j, array);
  }
  return array
}

function swap(i, j, array) {
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
return array;
}
