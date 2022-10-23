// Select elements
const numberBtns = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');

// Stores current value displayed on the calculator (except intial value)
let displayValue = null;

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

numberBtns.forEach(num => {
    num.addEventListener('click', () => {
        if (displayValue === null) {
            screen.textContent = num.textContent;
            displayValue = num.textContent;
            console.log(displayValue);
        } else {
            screen.textContent = screen.textContent + num.textContent;
            displayValue += num.textContent;
            console.log(displayValue);
        }
    })
})