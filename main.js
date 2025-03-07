let firstOperand;
let secondOperand;
let operator;
let usedEqualsBefore = false;

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
    // set operator to input if firstOperand
    if (firstOperand) {
      operator = e.target.textContent;
      console.log(`Operator set: ${operator}`);
    }
    // if secondOperand then do operation first show result,
    // set result to firstOperand and reset operator and secondOperand
    if (secondOperand) {
      console.log(`${firstOperand} ${operator} ${secondOperand}`);
      firstOperand = operate(+firstOperand, +secondOperand, operator);
      showResultInDisplay(firstOperand);
      console.log(`Result: ${firstOperand}`);
      secondOperand = "";
      operator = e.target.textContent;
    }
  });
});

equalsButton.addEventListener("click", (e) => {
  // does operation, when all variables set != undefined
  if (firstOperand && secondOperand && operator) {
    // do operation and show result in display
    console.log(`${firstOperand} ${operator} ${secondOperand}`);
    firstOperand = operate(+firstOperand, +secondOperand, operator);
    showResultInDisplay(firstOperand);
    console.log(`Result: ${firstOperand}`);
    secondOperand = "";
    operator = e.target.textContent;
    usedEqualsBefore = true;
    // set result as firstOperand in case a second operation will happen
    // reset secondOperand (and operator???? clean state? easier to handle depends on other logic)
  }
});

clearButton.addEventListener("click", resetCalculator);

/* Display logic */

function resetCalculator() {
  displayUI.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  operator = "";
  console.log(
    `RESETFunc first second operator: ${firstOperand} ${secondOperand} ${operator} `
  );
}

function showResultInDisplay(result) {
  displayUI.textContent = String(result).substring(0, 9);
}

function showInDisplay(number) {
  // Remove trailing 0, clean before entering second number and start new calc when entering new number after prev calculation
  if (
    displayUI.textContent == 0 ||
    (firstOperand && operator && !secondOperand) ||
    usedEqualsBefore
  ) {
    if (usedEqualsBefore) {
      usedEqualsBefore = false;
      resetCalculator();
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
  console.log(`Updated Operands: first:${firstOperand} sec: ${secondOperand}`);
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
