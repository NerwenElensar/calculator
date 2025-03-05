let firstOperand;
let secondOperand;
let operator;
const validOperators = ["+", "-", "*", "/"];

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const displayUI = document.querySelector(".display");

numberButtons.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (displayUI.textContent == 0 || (firstOperand && !secondOperand)) {
      displayUI.textContent = "";
    }
    //prevent display Overflow
    if (!(displayUI.textContent.length > 8)) {
      displayUI.textContent += e.target.textContent;
    }
    if (operator) {
      secondOperand = displayUI.textContent;
    }
  });
});

operatorButtons.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (firstOperand && operator) {
      let result = operate(+firstOperand, +secondOperand, operator);
      showResultInDisplay(result);
      firstOperand = result;
      secondOperand = "";
      operator = e.target.textContent;
    } else {
      firstOperand = displayUI.textContent;
      operator = e.target.textContent;
    }
  });
});

equalsButton.addEventListener("click", (e) => {
  if (firstOperand && secondOperand && operator) {
    let result = operate(+firstOperand, +secondOperand, operator);
    showResultInDisplay(result);
    firstOperand = result;
    secondOperand = "";
    operator = "";
  }
});

clearButton.addEventListener("click", resetCalculator);

/* Display logic */

function resetCalculator() {
  displayUI.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  operator = "";
}

function showResultInDisplay(result) {
  displayUI.textContent = result;
}

/* Calculator math functions */

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};
const divide = function (a, b) {
  return a / b;
};

function operate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand);
      break;
    case "-":
      return subtract(firstOperand, secondOperand);
      break;
    case "*":
      return multiply(firstOperand, secondOperand);
      break;
    case "/":
      return divide(firstOperand, secondOperand);
      break;
    default:
      return "Not a valid operator. Choose +,-,*,/";
      break;
  }
}
