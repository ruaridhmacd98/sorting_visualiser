import React from 'react';
import Select from 'react-select';
import 'react-dropdown/style.css';
import * as sorting from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const algorithms = [
  { value: sorting.getIntroSort, label: 'Intro Sort' },
  { value: sorting.getMergeSort, label: 'Merge Sort' },
  { value: sorting.getQuickSort, label: 'Quick Sort' },
  { value: sorting.getSelectionSort, label: 'Selection Sort' },
  { value: sorting.getInsertionSort, label: 'Insertion Sort' },
  { value: sorting.getShellSort, label: 'Shell Sort' },
  { value: sorting.getCocktailSort, label: 'Cocktail Shaker Sort' },
  { value: sorting.getBubbleSort, label: 'Bubble Sort' },
  { value: sorting.getGnomeSort, label: 'Gnome Sort' },
  { value: sorting.getCombSort, label: 'Comb Sort' },
  { value: sorting.getBogoSort, label: 'Bogo Sort' },
  { value: sorting.getHeapSort, label: 'Heap Sort' },
];

const arrays = [
  { value: randomArray, label: 'Random Array' },
  { value: reversedArray, label: 'Reversed Array' },
  { value: nearlySorted, label: 'Almost Sorted Array' },
];

const speeds = [
  { value: 0.1, label: 'Normal Speed' },
  { value: 0.05, label: 'Double Speed' },
  { value: 0.025, label: 'Quadruple Speed' },
];

const NUMBER_OF_ARRAY_BARS = 610;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      sortingAlgorithm: null,
      animationDelay: 0.1,
    };
  }

  selectAlgorithm = sortingAlgorithm => {
    this.setState(
      { sortingAlgorithm: sortingAlgorithm },
    );
  };

  chooseArray(arrayFunc) {
    var func = arrayFunc.value
    const array = func()
    this.setState({array});
  }

  selectSpeed = delay => {
    this.setState({animationDelay: delay});
  }

  sort() {
    var algorithm = this.state.sortingAlgorithm.value;
    const animations = algorithm(this.state.array);
    this.play_animations(animations);
  }

  play_animations (animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
        setTimeout(() => {
          const [index, newValue] = animations.shift();
          const style = arrayBars[index].style;
          style.backgroundColor = `hsl(${newValue}, 100%, 50%)`;
        }, i * this.state.animationDelay);
      }
  }

  componentDidMount() {
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
	<div>
	<Select
	  className='choices'
          onChange={this.selectAlgorithm}
          options={algorithms}
	  placeholder='Select Sorting Algorithm'
        />
        <button className="button"  onClick={() => this.sort()}>Sort</button>
	<Select
	  className='choices'
          onChange={(e) => this.chooseArray(e)}
          options={arrays}
	  placeholder='Select Starting Array'
        />
	</div>
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
