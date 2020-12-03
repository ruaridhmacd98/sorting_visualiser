import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getCocktailSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBogoSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 0.25;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 610;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
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

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    play_animations(animations);
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    play_animations(animations);
  }

  bogoSort() {
      const animations = getBogoSortAnimations(this.state.array);
      play_animations(animations);
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    play_animations(animations);
  }

  cocktailShakerSort() {
    const animations = getCocktailSortAnimations(this.state.array);
    play_animations(animations);
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: `hsl(${value}, 100%, 50%)`,
              height: `500px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.reversedArray()}>New Reversed Array</button>
        <button onClick={() => this.nearlySorted()}>Generate New Nearly Sorted Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.cocktailShakerSort()}>Cocktail Shaker Sort</button>
        <button onClick={() => this.bogoSort()}>Bogo Sort</button>
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
