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
  } else if (expression["firstOperand"]) {
    expression["secondOperand"] += event.target.textContent;
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
  expression["firstOperand"] = "";
  expression["secondOperand"] = "";
  expression["operator"] = "";
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

function operateAndSetResult() {
  let firstNum = parseInt(expression["firstOperand"]);
  let secondNum = parseInt(expression["secondOperand"]);
  expression["firstOperand"] = parseFloat(
    operate(expression["operator"], firstNum, secondNum).toPrecision(10)
  ).toString();
  expression["secondOperand"] = "";
}
