const numberButton = document.querySelectorAll('.numberButton');
const operationButton = document.querySelectorAll('.operationButton');
const clearButton = document.querySelector('.clearButton');
const deleteButton = document.querySelector('.deleteButton');
const equalsButton = document.querySelector('.equalsButton');
const previousInputScreen = document.querySelector('.previousInputScreen');
const currentInputScreen = document.querySelector('.currentInputScreen');

class Calculator {
    constructor(currentInputScreen, previousInputScreen) {
        this.currentInput = currentInputScreen;
        this.previousInput = previousInputScreen;
        this.clear();
    }

    clear() {
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }

    delete() {
        this.current = this.current.toString().slice(0, -1);
    }

    appendNumber(number) {
        if ((number === ".") && (this.current.includes("."))) {
            return;
        }
        this.current = this.current.toString() + number.toString();
    }

    operationFunction(operation) {
        if (this.current === '') {
            return;
        }

        if (this.previous !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '';
    }

    calculate() {
        let calculation;
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);

        if (isNaN(prev) || isNaN(curr)) {
            return;
        }

        switch (this.operation) {
            case '÷':
                calculation = prev / curr;
                break;
            case '*':
                calculation = prev * curr;
                break;
            case '+':
                calculation = prev + curr;
                break;
            case '-':
                calculation = prev - curr;
                break;
            default:
                return;
        }
        this.current = calculation;
        this.operation = undefined;
        this.previous = '';
    }

    displayUpdate() {
        if (this.operation != null) {
            this.previousInput.innerText = `${this.previous} ${this.operation}`;
        }
        else {
            this.previousInput.innerText = '';
        }
        this.currentInput.innerText = this.current;
    }
}

const calculator = new Calculator(currentInputScreen, previousInputScreen);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.displayUpdate()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationFunction(button.innerText);
        calculator.displayUpdate()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.displayUpdate()
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.displayUpdate();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.displayUpdate();
})