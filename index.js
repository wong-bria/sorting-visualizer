// Currently only has bubble sort. Will add more sorts in the future.

// Get elements by their IDs from the DOM
let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn =  document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let minValue = 1;
let maxValue = 50;
let numBars = 50;
let scaleHeight = 8;
let unsortedArray = new Array(numBars);

// Generate a random number between min and max (inclusive)
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize the unsortedArray with random values
function createRandomArray() {
    for (let i = 0; i < numBars; i++) {
        unsortedArray[i] = randomNum(minValue, maxValue);
    }
}

// Event listener to create the random array and render it when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    createRandomArray(); // Make call to initialize random array 
    renderBars(unsortedArray); // Make call to render the unsorted array as bars
});

// Render the bars in the DOM based on the array values
function renderBars(array){
    for(let i = 0; i < array.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * scaleHeight + "px";
        bars_container.appendChild(bar);
    }
}

// Event listener to randomize the array and re-render the bars when clicked
randomize_array.addEventListener("click", function() {
    createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsortedArray);
});

// Pause execution for the given amount of time in milliseconds
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Bubble sort implementation with async/await for smoother animations
async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {

                // Change the color of the bars being compared
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "#76b6c4";
                    }
                }

                // Swap the two elements in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j+1] = temp;

                // Update the heights and colors of the bars to reflect the swap
                bars[j].style.height = array[j] * scaleHeight + "px";
                bars[j].style.backgroundColor = "#7fcdff";
                bars[j + 1].style.height = array[j + 1] * scaleHeight + "px";
                bars[j + 1].style.backgroundColor = "#7fcdff";

                // Pause for 10 ms for smoother animation
                await sleep(10);
            }
        }

        // Pause for 10 ms for smoother animation
        await sleep(10);
    }
    return array;
}

// Event Listener to trigger bubble sort
sort_btn.addEventListener("click", function () {
    let sorted_array = bubbleSort(unsortedArray);
    console.log(sorted_array);
});