// Select elements
const numberBtns = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');

// Stores current value displayed on the calculator (except intial value)
let displayValueCurr = null;
let displayValuePrev = null;

// Adds x and y
function add(x, y) {
    return x + y;
};

// Subtracts x and y
function subtract(x, y) {
    return x - y;
};

// Multiplies x and y
function multiply(x, y) {
    return x * y;
  };

// Divides x and y
function divide(x, y) {
    return x / y;
}

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
}

// MAKE SURE TO CHECK IF DISPLAYVALUECURR ENDS WITH '.' WHEN OPERATOR OR = IS PRESSED


// Display number on screen when number button clicked
numberBtns.forEach(num => {
    num.addEventListener('click', () => {
        if (num.textContent === '.') {
            // Keep the 0 in front if decimal is clicked first
            if (displayValueCurr === null) {
                displayValueCurr = '0.';
                screen.textContent = displayValueCurr;
                console.log('displayValueCurr: ' + displayValueCurr);
                return;
            // Make sure there can only be one decimal
            } else if (displayValueCurr.includes('.') === true) {
                return;
            }
        }

        if (num.textContent === '0') {
            // Do not add leading zeroes to screen
            if (displayValueCurr === null) {
                return;
            }
        }

        // Remove intial 0 when clicking number for first time
        if (displayValueCurr === null) {
            screen.textContent = num.textContent;
            displayValueCurr = num.textContent;
            console.log('displayValueCurr: ' + displayValueCurr);
        // Add number to screen to the right of all other numbers on screen
        } else {
            screen.textContent = screen.textContent + num.textContent;
            displayValueCurr += num.textContent;
            console.log('displayValueCurr: ' + displayValueCurr);
        }
    })
});