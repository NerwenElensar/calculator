// collect the data here to use it later with the operate function
const expression = {
  firstOperand: "",
  secondOperand: "",
  operator: "",
};

//Eventlisteners
const numberButtons = Array.from(document.querySelectorAll(".number"));
numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target.textContent);
  });
});

const operatorButtons = Array.from(document.querySelectorAll(".operator"));
operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target.textContent);
  });
});

const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
equalsButton.addEventListener("click", (e) => {
  console.log(e.target.textContent);
});

clearButton.addEventListener("click", (e) => {
  console.log(e.target.textContent);
});

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
