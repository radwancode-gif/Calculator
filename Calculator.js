// State management variables
let currentInput = "";
let previousInput = "";
let operation = null;
let result = "";

// Selected elements to work in js
const display = document.querySelector("#display");
const calcdisplay = document.querySelector("#calDisplay");
const dotButton = document.querySelector("#dot");
const allOperator = document.querySelectorAll(".operator");
const allNum = document.querySelectorAll(".num");
const allClear = document.querySelector(".clear");
const doEqual = document.querySelector(".equal");
const deleteOne = document.querySelector("#delete");

// Appends user typed digits to the active display state
// Typed number argument and currentInput read and ch
function appendNumber(number) {
  if (number === "0" && currentInput === "0") return; // Prevent multiple leading zeros
  currentInput = currentInput.toString() + number.toString();
  updateDisplay();
}

//this is a click button to an function to use instead of using it html.
allNum.forEach((N) => {
  N.addEventListener("click", () => {
    const nu = N.textContent;
    appendNumber(nu);
  });
});

// when there something in display this button will delete the last string
function deleteTheLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

deleteOne.addEventListener("click", deleteTheLast);

function appendDot() {
  currentInput = currentInput.toString();
  if (currentInput.includes(".")) return;
  currentInput = currentInput + ".";
  if (currentInput === "") {
    if (currentInput === "") {
      currentInput = "0.";
    } else {
      currentInput = currentInput + ".";
    }
  }
  updateDisplay();
}

dotButton.addEventListener("click", appendDot);

// Configures the chosen mathematical operation symbol
function appendOperator(op) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate(); // If a calculation is pending, compute it first
  }
  operation = op;
  previousInput = currentInput;
  currentInput = "";
}

allOperator.forEach((element) => {
  element.addEventListener("click", () => {
    const opr = element.textContent;
    appendOperator(opr);
    updateDisplay();
  });
});

// Resets state variables to clear out display contents
function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operation = null;
  result = "";
  updateDisplay();
  resultDisplay();
}

allClear.addEventListener("click", clearDisplay);

// Refreshes the hardware display text component markup
function updateDisplay() {
  calcdisplay.value = currentInput || previousInput || "0";
}

function resultDisplay() {
  display.value = result;
}

// Processes calculation state variables via conditional math blocks
function calculate() {
  let finalResult;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  // Cancel operation if data entries are incomplete
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      finalResult = prev + current;
      break;
    case "-":
      finalResult = prev - current;
      break;
    case "*":
      finalResult = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Error: Cannot divide by zero!");
        clearDisplay();
        return;
      }
      finalResult = prev / current;
      break;
    default:
      return;
  }

  result = finalResult;
  operation = null;
  previousInput = "";
  resultDisplay();
}

doEqual.addEventListener("click", calculate);
