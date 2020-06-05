class Calculator {
  constructor(previusOperandTextElement, currentOperandTextElement) {
    this.previusOperandTextElement = previusOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear;
  }

  clear() {
    this.currentOperandTextElement = "";
    this.previusOperandTextElement = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previusOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previusOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previusOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        computation.toFixed(2);
        break;
      case "-":
        computation = prev - current;
        computation.toFixed(2);
        break;
      case "*":
        computation = prev * current;
        computation.toFixed(2);
        break;
      case "/":
        computation = prev / current;
        computation.toFixed(2);
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previusOperand = "";
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previusOperandTextElement.innerText = this.previusOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-claer]");
const deleteButton = document.querySelector("[data-delete]");
const previusOperandTextElement = document.querySelector(
  "[data-previus-display]"
);
const currentOperandTextElement = document.querySelector("[data-display]");

const calculator = new Calculator(
  previusOperandTextElement,
  currentOperandTextElement
);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
