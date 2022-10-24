// Select elements
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('#clear');
const parityBtn = document.querySelector('#parity');
const percentBtn = document.querySelector('#percent');
const screen = document.querySelector('.screen');

// Stores values needed to do operations
let displayValueCurr = null;
let displayValuePrev = null;
let operator = '';

// Adds x and y
function add(x, y) {
    return Number(x) + Number(y);
};

// Subtracts x and y
function subtract(x, y) {
    return Number(x) - (y);
};

// Multiplies x and y
function multiply(x, y) {
    return Number(x) * Number(y);
};

// Divides x and y
function divide(x, y) {
    if (y == '0') {
        return 'ERROR';
    }
    return Number(x) / Number(y);
};

// Calls the function associated with operator with x and y as inputs
function operate(operator, x, y) {
    if (operator === '+') {
        return add(x,y);
    } else if (operator === '-') {
        return subtract(x,y);
    } else if (operator === '*') {
        return multiply(x,y);
    } else if (operator === '/') {
        return divide(x,y);
    }
};

// Display number on screen when number button clicked (including decimal)
numberBtns.forEach(num => {
    num.addEventListener('click', () => {
        // Make sure only 10 numbers (including decimal but not parity) can be displayed on the screen
        if (screen.textContent.length >= 10 && displayValueCurr !== null) {
            return;
        }

        if (num.textContent === '.') {
            // Keep the 0 in front if decimal is clicked first
            if (displayValueCurr === null || displayValueCurr === '0') {
                displayValueCurr = '0.';
                screen.textContent = displayValueCurr;
                return;
            // Make sure there can only be one decimal
            } else if (displayValueCurr.includes('.') === true) {
                return;
            }
        }

        if (num.textContent === '0') {
            // Do not add leading zeroes to screen
            if (displayValueCurr === '0') {
                return;
            }
        }

        // Remove intial 0 when clicking number for first time
        if (displayValueCurr === null || displayValueCurr === '0') {
            screen.textContent = num.textContent;
            displayValueCurr = num.textContent;
        // Add number to screen to the right of all other numbers on screen
        } else {
            screen.textContent = screen.textContent + num.textContent;
            displayValueCurr += num.textContent;
        }
    })
});

// Perform calculations when operator buttons are pressed
operatorBtns.forEach(op => {
    op.addEventListener('click', () => {
        // Remove decimal if the current number on screen ends with a decimal
        if (displayValueCurr !== null) {
            if (displayValueCurr.charAt(displayValueCurr.length - 1) === '.') {
                displayValueCurr = displayValueCurr.slice(0, -1);
                screen.textContent = screen.textContent.slice(0, -1);
            }
        }

        // Treat screen value as 0 if operator pressed before any number clicked
        if (displayValueCurr === null && operator === '') {
            displayValuePrev = '0';
        // Keep screen the same if this is first operator clicked after number
        } else if (displayValuePrev === null) {
            displayValuePrev = displayValueCurr;
            displayValueCurr = null;
        // Call operate function if two numbers separated by an operator 
        // have been clicked and display result on screen
        } else if (displayValueCurr !== null) {
            displayValuePrev = operate(operator, displayValuePrev, displayValueCurr);
            displayValuePrev = displayValuePrev.toString().slice(0, 10);
            displayValueCurr = null;
            screen.textContent = displayValuePrev;
        }

        // Store correct operator
        if (op.textContent !== '=') {
            operator = op.textContent;
        }
    })
});

// Resets the calculator and clears values
clearBtn.addEventListener('click', () => {
    displayValueCurr = null;
    displayValuePrev = null;
    operator = '';
    screen.textContent = '0';
});

// Changes the parity of the current number
parityBtn.addEventListener('click', () => {
    // If entering new number, simply put display parity on screen (if negative)
    if (displayValueCurr === null) {
        displayValueCurr = '-';
        screen.textContent = '-';
    } else if (displayValueCurr.charAt(0) === '-') {
        displayValueCurr = displayValueCurr.substring(1);
        screen.textContent = screen.textContent.substring(1);
    } else {
        displayValueCurr = '-' + displayValueCurr;
        screen.textContent = '-' + screen.textContent;
    }
});

// Converts current number on screen to percentage
percentBtn.addEventListener('click', () => {
    if (displayValueCurr !== null) {
        displayValueCurr = operate('/', displayValueCurr, 100);
        displayValueCurr = displayValueCurr.toString().slice(0, 10);
        screen.textContent = displayValueCurr;
    }
});