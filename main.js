const display = document.querySelector(".display");

// collect the data here to use it later with the operate function
const expression = {
  firstOperand: "",
  secondOperand: "",
  operator: "",
};

//Eventlisteners
const numberButtons = Array.from(document.querySelectorAll(".number"));
numberButtons.forEach((button) => {
  button.addEventListener("click", numberHandler);
});

const operatorButtons = Array.from(document.querySelectorAll(".operator"));
operatorButtons.forEach((button) => {
  button.addEventListener("click", operatorHandler);
});

const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
equalsButton.addEventListener("click", equalsHandler);

clearButton.addEventListener("click", clearHandler);

// Callback functions for eventlisteners
function numberHandler(event) {
  if (!expression["operator"] && !isNaN(event.target.textContent)) {
    expression["firstOperand"] += event.target.textContent;
    display.textContent = expression["firstOperand"];
  } else if (expression["firstOperand"]) {
    expression["secondOperand"] += event.target.textContent;
    display.textContent = expression["secondOperand"];
  }
}

function operatorHandler(event) {
  if (expression["firstOperand"] && !expression["secondOperand"]) {
    expression["operator"] = event.target.textContent;
  } else if (expression["secondOperand"]) {
    operateAndSetResult();
    expression["operator"] = event.target.textContent;
  }
}

function equalsHandler(event) {
  if (isOperationPossible()) {
    operateAndSetResult();
    expression["operator"] = "";
  }
}

function clearHandler() {
  resetCalculator();
  display.textContent = "0";
}

// General functions for calculations

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "not a valid operator. Something went wrong";
  }
}

// Helpers
function isOperationPossible() {
  return expression["firstOperand"] && expression["operator"] && expression["secondOperand"];
}

function isInfinity(result) {
  return result === Infinity;
}

function resetCalculator() {
  expression["firstOperand"] = "";
  expression["secondOperand"] = "";
  expression["operator"] = "";
}

function operateAndSetResult() {
  let firstNum = Number(expression["firstOperand"]);
  let secondNum = Number(expression["secondOperand"]);
  console.log(firstNum);
  console.log(secondNum);
  // Use Number, so it shows a whole number, when the decimals are 0's
  let result = operate(expression["operator"], firstNum, secondNum);
  if (isInfinity(result)) {
    display.textContent = "Can't divide by 0. Press Clear...";
    resetCalculator();
  } else {
    expression["firstOperand"] = Number(result.toPrecision(10)).toString();
    expression["secondOperand"] = "";
    display.textContent = expression["firstOperand"];
  }
}
