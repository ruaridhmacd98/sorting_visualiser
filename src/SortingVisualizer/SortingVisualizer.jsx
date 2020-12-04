import React from 'react';
import Select from 'react-select';
import 'react-dropdown/style.css';
import {getMergeSort} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSort} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getCocktailSort} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getQuickSort} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getSelectionSort} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBogoSort} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const options = [
  { value: getMergeSort, label: 'Merge Sort' },
  { value: getQuickSort, label: 'Quick Sort' },
  { value: getSelectionSort, label: 'Selection Sort' },
  { value: getCocktailSort, label: 'Cocktail Shaker Sort' },
  { value: getBubbleSort, label: 'Bubble Sort' },
  { value: getBogoSort, label: 'Bogo Sort' },
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

  sort() {
    var algorithm = this.state.sortingAlgorithm.value;
	  console.log(algorithm)
    const animations = algorithm(this.state.array);
    play_animations(animations);
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(0, 360));
    }
    this.setState({array});
  }

  reversedArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(1, 359));
    }
    array.sort(function(a, b){return a - b});
    array.reverse();
    this.setState({array});
  }

  nearlySorted() {
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
    this.setState({array});
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
	<Select
          onChange={this.selectAlgorithm}
          options={options}
	  placeholder='Select Sorting Algorithm'
        />
        <button onClick={() => this.sort()}>Sort</button>
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.reversedArray()}>New Reversed Array</button>
        <button onClick={() => this.nearlySorted()}>Generate New Nearly Sorted Array</button>
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
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = `hsl(${newHeight}, 100%, 50%)`;
        }, i * ANIMATION_SPEED_MS);
      }
}

function swap(i, j, array) {
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
return array;
}
