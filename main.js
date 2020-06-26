class Calculator {
    constructor(displayPreviousOperand, displayCurrentOperand) {
        this.displayPreviousOperand = displayPreviousOperand;
        this.displayCurrentOperand = displayCurrentOperand;
    };

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (!this.currentOperand) {
            this.currentOperand = number;
        } else {
        this.currentOperand = this.currentOperand.toString() + number.toString();
        };
    };

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        };
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };

    posneg() {
        this.currentOperand = parseFloat(this.currentOperand) * -1;
    };

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '+':
                computation = add(prev, current);
                break;
            case '-':
                computation = subtract(prev, current);
                break;
            case '*':
                computation = multiply(prev, current);
                break;
            case '÷':
                if (current == 0) {
                    computation = "Math ERROR";
                    } else {
                computation = divide(prev, current);
                    };
                break;
            default:
                return;
        };
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    };

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (number == "Math ERROR") {
            return "Math ERROR";
        };
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        };
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        };
    };

    updateDisplay() {
        this.displayCurrentOperand.innerText = 
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.displayPreviousOperand.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.displayPreviousOperand.innerText = '';
        };
    };
};

const digits = document.querySelectorAll("[data-number]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const posnegBtn = document.querySelector("[data-posneg]");
const equalsBtn = document.querySelector("[data-equals]");
const operators = document.querySelectorAll("[data-operation]");
const displayPreviousOperand = document.querySelector("[data-previous-operand");
const displayCurrentOperand = document.querySelector("[data-current-operand]");

const calculator = new Calculator(displayPreviousOperand, displayCurrentOperand);

digits.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

posnegBtn.addEventListener('click', button => {
    calculator.posneg();
    calculator.updateDisplay();
});

equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

window.addEventListener('keydown', clickButton); 

function clickButton(e) {
    if (e.keyCode === 13) {
      event.preventDefault();
    };
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (key != null) key.click();
  };

// Operators
function add(a, b) {return a + b;}

function subtract(a, b) {return a - b};

function multiply(a, b) {return a * b};

function divide(a, b) {return a / b};