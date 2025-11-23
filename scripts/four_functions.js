"use strict";

// create empty array for history log, empty current input, inDarkMode is set to false, and the memory is empty  
let currentInput = '';
let memory = 0;
let history = [];
let inDarkMode = false;

/* updates the display area whenever an appropriate button is clicked */ 
function updateDisplay(value) {
    document.getElementById('display').value = value;
}

// whenever a number button is clicked, update display
function handleNumber(num) {
    currentInput += num;
    updateDisplay(currentInput);
}

/* updates the display with the appropriate operator */
function handleOperator(operator) {
    currentInput += ` ${operator} `;
    updateDisplay(currentInput);
}

/* whenever the M+, M-, MR, or MC buttons are clicked
increase, decrease, clear, or display the memory*/
function handleMemory(action) {
    // parseFloat converts string to float 
    switch (action) {
        case 'M+':
            memory += parseFloat(currentInput);
            break;
        case 'M-':
            memory -= parseFloat(currentInput);
            break;
        case 'MR':
            currentInput = memory.toString();
            break;
        case 'MC':
            memory = 0;
            break;
        default:
            break;
    }
    updateDisplay(currentInput);

}

/* calculates the math and throws an error if the eval() does not work*/
function calculate() {
    if(currentInput.includes('÷ 0')){
        updateDisplay('Error, divide by 0');
    } else {
        try {
            // evaluates and executes JS code, example would be 5 * 6   
            currentInput = eval(currentInput.replace('x', '*').replace('÷', '/')).toString();
            history.push(currentInput);
            updateDisplay(currentInput);
        } catch (error) {
            updateDisplay('Error');
            currentInput = '';
        }
    }
}

// clears the input and the display
function clearInput() {
    currentInput = '';
    updateDisplay('');
}

// toggle history visibility
function toggleHistory() {
    
    const historyContainer = document.getElementById('history');
    const isVisible = historyContainer.style.display === 'block';

    /* if the history element is visible, make it not visible 
    else, make it visible */
    isVisible ? 
    historyContainer.style.display = 'none' : 
    historyContainer.style.display = 'block';
    
    const log = document.getElementById('history-log');
    
    /* clears the inner HTML of the history-log element 
    if this is not done, then there will be duplicates from
    the 'history.forEach' line because it will account for the items 
    in the history list.*/
    log.innerHTML = "";

    history.forEach(item => {
        
        /* create a new div for each item in the history array, with CSS class and 
        populate the div content with data from the history list */
        const entry = document.createElement("div");
        entry.className = "history-item";
        entry.textContent = item;

        /* sets the currentInput and display to the 
        appropriate item, if that item is clicked */ 
        entry.addEventListener("click", ()=> {
            currentInput = item;
            updateDisplay(currentInput);
        });

        // adds the new entry to the log
        log.appendChild(entry);
    })
};

/* adds a decimal if one is not there*/
function handleDecimal() {
    // split the current input by the operator (like +, -, x, ÷) to get the individual numbers
    let currentNumbers = currentInput.split(/[\+\-\x÷]/); 
    
    // checks if the last number (after the last operator) already contains a decimal point
    let lastNumber = currentNumbers[currentNumbers.length - 1];

    if (!lastNumber.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

/* add an event listener for each button and assign the appropriate function depending 
on the button that was pressed */
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;

        if (buttonText >= '0' && buttonText <= '9') {
            handleNumber(buttonText);
        } else if (buttonText === '+' || buttonText === '-' || buttonText === 'x' || buttonText === '÷') {
            handleOperator(buttonText);
        } else if (buttonText === '=') {
            calculate();
        } else if (buttonText === '.') {
            handleDecimal();
        } else if (buttonText === 'M+' || buttonText === 'M-' || buttonText === 'MR' || buttonText === 'MC') {
            handleMemory(buttonText);
        } else if (buttonText === 'C') {
            clearInput();
        } else if (buttonText === 'Dark Mode' || buttonText === 'Light Mode'){
            toggleDarkMode();
        } else if (buttonText === 'Check History'){
            toggleHistory();
        } else if (buttonText === 'Clear History'){
            clearHistory();
        }  
    });
});

// clears the log history
function clearHistory() {
    history = [];
}

/* sets inDarkMode to the opposite state */ 
function toggleDarkMode() {
    inDarkMode = !inDarkMode;

    document.body.classList.toggle("dark");

    const darkBtn = document.querySelector('.dark-toggle');
    darkBtn.textContent = inDarkMode ? 'Light Mode' : 'Dark Mode';
}

// activates nav whenever it's clicked 
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("active");
});
