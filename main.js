let firstOperand;
let secondOperand;
let operator;
const zeroErrorEmoji = "ಠ_ಠ div0";

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const displayUI = document.querySelector(".display");

numberButtons.forEach((number) => {
  number.addEventListener("click", (e) => {
    showInDisplay(e.target.textContent);
    updateOperand(displayUI.textContent);
  });
});

operatorButtons.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (firstOperand && !secondOperand) {
      operator = e.target.textContent;
    }
    if (secondOperand) {
      firstOperand = operate(+firstOperand, +secondOperand, operator);
      resetSecOperandAndSaveOperator(e.target.textContent);
      showResultInDisplay();
      checkForZeroDivisionAndAlert();
    }
  });
});

equalsButton.addEventListener("click", (e) => {
  if (firstOperand && secondOperand && operator) {
    firstOperand = operate(+firstOperand, +secondOperand, operator);
    resetSecOperandAndSaveOperator(e.target.textContent);
    showResultInDisplay();
    checkForZeroDivisionAndAlert();
  }
});

clearButton.addEventListener("click", resetCalculator);

/* Helper Functions */

function resetCalculator() {
  displayUI.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  operator = "";
  document.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
}

function showResultInDisplay() {
  displayUI.textContent = String(firstOperand).substring(0, 9);
}

function showInDisplay(number) {
  if (
    displayUI.textContent == 0 ||
    (firstOperand && operator && !secondOperand) ||
    usedEqualsBefore()
  ) {
    if (usedEqualsBefore()) {
      operator = "";
    }
    displayUI.textContent = "";
  }
  //prevent display Overflow
  if (!(displayUI.textContent.length > 8)) {
    displayUI.textContent += number;
  }
}

function updateOperand(numberShownInDisplay) {
  if (operator) {
    secondOperand = numberShownInDisplay;
  } else {
    firstOperand = numberShownInDisplay;
  }
}

function usedEqualsBefore() {
  return operator === "=";
}

function resetSecOperandAndSaveOperator(currentOperator) {
  secondOperand = "";
  operator = currentOperator;
}

function checkForZeroDivisionAndAlert() {
  if (firstOperand == zeroErrorEmoji) {
    resetCalculator();
    showInDisplay(zeroErrorEmoji);
    numberButtons.forEach((num) => (num.disabled = true));
    operatorButtons.forEach((op) => (op.disabled = true));
    equalsButton.disabled = true;
  }
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
      return secondOperand == 0 ? zeroErrorEmoji : divide(firstOperand, secondOperand);
      break;
    default:
      return "Not a valid operator. Choose +,-,*,/";
      break;
  }
}
