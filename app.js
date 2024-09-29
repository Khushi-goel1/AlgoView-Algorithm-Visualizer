let array = [];
const arrayContainer = document.getElementById('array-container');
let executionInProcess = false;
const usualColor = '#80ced6';
const sortingColor = 'coral';
const currentBarColor = '#ffcccb';

//Generating an array of random heights
function generateArray(size = 20) {
  array = [];
  arrayContainer.innerHTML = ''; //Clearing the container
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    array.push(value);

    //Bar Element
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value}%`;
    arrayContainer.appendChild(bar);
  }
}

function getNumElements() {
  return parseInt(document.getElementById('no-of-array-elements').value);
}

function getSpeed() {
  return 1000 - parseInt(document.getElementById('speed-slider').value);
}

document
  .getElementById('no-of-array-elements')
  .addEventListener('input', () => {
    stopExecution();
    generateArray(getNumElements());
  });

document.getElementById('generate-array').addEventListener('click', () => {
  const numElements = getNumElements();
  generateArray(numElements);
});
generateArray();

function startOfFunc() {
  disableOtherButtons();
  executionInProcess = true;
  for (let bar of document.getElementsByClassName('bar')) {
    bar.style.backgroundColor = usualColor;
  }
  if (getNumElements() != array.length) {
    generateArray(getNumElements());
  }
}

function endOfFunc() {
  enableOtherButtons();
}

function selectButton(str) {
    const button = document.getElementById(str);
    button.classList.add('selected');
}

function unselectButton(str) {
    const button = document.getElementById(str);
    button.classList.remove('selected'); 
}

async function bubbleSort() {
  startOfFunc();
  const bars = document.getElementsByClassName('bar');
  selectButton('bubble-sort');

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (!executionInProcess) {
        unselectButton('bubble-sort');
        break;
      }
      bars[j].style.backgroundColor = sortingColor;
      bars[j + 1].style.backgroundColor = sortingColor;

      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        bars[j].style.height = `${array[j]}%`;
        bars[j + 1].style.height = `${array[j + 1]}%`;
      }

      await new Promise((resolve) => setTimeout(resolve, getSpeed()));

      bars[j].style.backgroundColor = usualColor;
      bars[j + 1].style.backgroundColor = usualColor;
    }
    if (!executionInProcess) {
      unselectButton('bubble-sort');
      break;
    }
  }
  unselectButton('bubble-sort');
  endOfFunc();
}

document
  .getElementById('bubble-sort')
  .addEventListener('click', () => bubbleSort());

async function insertionSort() {
  startOfFunc();
  const bars = document.getElementsByClassName('bar');
  selectButton('insertion-sort');

  for (let i = 0; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    bars[i].style.backgroundColor = sortingColor;

    while (j >= 0 && array[j] > key) {
      if (!executionInProcess) {
        unselectButton('insertion-sort');
        break;
      }
      bars[j].style.backgroundColor = sortingColor;
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1]}%`;
      await new Promise((resolve) => setTimeout(resolve, getSpeed()));
      bars[j].style.backgroundColor = usualColor;
      j--;
    }

    if (!executionInProcess) {
      unselectButton('insertion-sort');
      break;
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key}%`;

    bars[i].style.backgroundColor = usualColor;
  }
  unselectButton('insertion-sort');
  endOfFunc();
}

document
  .getElementById('insertion-sort')
  .addEventListener('click', () => insertionSort());

async function selectionSort() {
  startOfFunc();
  const bars = document.getElementsByClassName('bar');
  selectButton('selection-sort');

  for (let i = 0; i < array.length - 1; i++) {
    let index = i;
    bars[i].style.backgroundColor = sortingColor;
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = currentBarColor;
      if (!executionInProcess) {
        bars[j].style.backgroundColor = usualColor;
        unselectButton('selection-sort');
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, getSpeed()));
      let done = false;
      if (array[j] < array[index]) {
        if (index !== i) {
          bars[index].style.backgroundColor = usualColor;
        }
        bars[j].style.backgroundColor = sortingColor;
        index = j;
        done = true;
      }
      if (done === false) {
        bars[j].style.backgroundColor = usualColor;
      }
    }

    if (!executionInProcess) {
      unselectButton('selection-sort');
      break;
    }

    let key = array[i];
    array[i] = array[index];
    array[index] = key;

    bars[i].style.height = `${array[i]}%`;
    bars[index].style.height = `${array[index]}%`;

    bars[i].style.backgroundColor = usualColor;
    bars[index].style.backgroundColor = usualColor;
  }
  endOfFunc();
  unselectButton('selection-sort');
}

document
  .getElementById('selection-sort')
  .addEventListener('click', () => selectionSort());

const actionButton = document.getElementsByClassName('action-button');
const otherButton = document.getElementsByClassName('other-button');

function disableOtherButtons() {
  for (let button of actionButton) {
    button.disabled = true;
    button.style.cursor = 'not-allowed';
  }
  for (let button of otherButton) {
    button.disabled = true;
    button.style.cursor = 'not-allowed';
  }
}

function enableOtherButtons() {
  for (let button of actionButton) {
    button.disabled = false;
    button.style.cursor = 'pointer';
  }
  for (let button of otherButton) {
    button.disabled = false;
    button.style.cursor = 'pointer';
  }
}

function stopExecution() {
  executionInProcess = false;
  for (let bar of document.getElementsByClassName('bar')) {
    bar.style.backgroundColor = usualColor;
  }
}

document
  .getElementById('stop-button')
  .addEventListener('click', () => stopExecution());

const backgroundMusic = document.getElementById('background-music');
const muteButton = document.getElementById('mute-button');
let isMuted = false;

// Play music when the page loads
window.addEventListener('load', () => {
  backgroundMusic.volume = 0.2; // Set the volume
  backgroundMusic.play();
});

// Toggle mute
muteButton.addEventListener('click', () => {
  if (isMuted) {
    backgroundMusic.play();
    muteButton.classList.remove('fa-volume-mute');
    muteButton.classList.add('fa-volume-up');
    isMuted = false;
  } else {
    backgroundMusic.pause();
    muteButton.classList.remove('fa-volume-up');
    muteButton.classList.add('fa-volume-mute');
    isMuted = true;
  }
});
