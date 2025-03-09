const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const customTipInput = document.getElementById("custom-tip");
const tipButtons = document.querySelectorAll(".tip-btn");
const tipAmountEl = document.getElementById("tip-amount");
const totalAmountEl = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset-btn");
const billError = document.getElementById("bill-error");
const peopleError = document.getElementById("people-error");

let bill = 0;
let tipPercentage = 0;
let numberOfPeople = 0;
let isAnyValueEntered = false;

function validateNumberInput(input) {
  let value = input.value.replace(/[^\d.]/g, "");

  const decimalPoints = value.match(/\./g) || [];
  if (decimalPoints.length > 1) {
    value = value.replace(/\.(?=.*\.)/g, "");
  }

  if (value.includes(".")) {
    const parts = value.split(".");
    if (parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
      value = parts.join(".");
    }
  }

  input.value = value;
  return parseFloat(value) || 0;
}

function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

function calculateResults() {
  if (bill > 0 && tipPercentage >= 0 && numberOfPeople > 0) {
    const tipAmount = (bill * tipPercentage) / 100 / numberOfPeople;
    const totalAmount = bill / numberOfPeople + tipAmount;

    tipAmountEl.textContent = formatCurrency(tipAmount);
    totalAmountEl.textContent = formatCurrency(totalAmount);
    resetBtn.disabled = false;
  } else {
    tipAmountEl.textContent = "$0.00";
    totalAmountEl.textContent = "$0.00";
    resetBtn.disabled = !isAnyValueEntered;
  }
}

function validateZeroInput(input, errorElement) {
  if (parseFloat(input.value === 0)) {
    errorElement.style.display = "block";
    input.classList.add("error");
    return false;
  } else {
    errorElement.style.display = "none";
    input.classList.remove("error");
    return true;
  }
}

billInput.addEventListener("input", function () {
  bill = validateNumberInput(this);
  isAnyValueEntered = true;
  validateZeroInput(this, billError);
  calculateResults();
});

peopleInput.addEventListener("input", function () {
  numberOfPeople = validateNumberInput(this);
  isAnyValueEntered = true;
  validateZeroInput(this, peopleError);
  calculateResults();
});

customTipInput.addEventListener("input", function () {
  tipButtons.forEach((btn) => btn.classList.remove("active"));

  tipPercentage = validateNumberInput(this);
  isAnyValueEntered = true;
  calculateResults();
});

tipButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    tipButtons.forEach((btn) => btn.classList.remove("active"));

    this.classList.add("active");

    customTipInput.value = "";

    tipPercentage = parseInt(this.dataset.tip);
    isAnyValueEntered = true;
    calculateResults();
  });
});

resetBtn.addEventListener("click", function () {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";

  bill = 0;
  tipPercentage = 0;
  numberOfPeople = 0;
  isAnyValueEntered = false;

  tipAmountEl.textContent = "$0.00";
  totalAmountEl.textContent = "$0.00";
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  billError.style.display = "none";
  peopleError.style.display = "none";
  billInput.classList.remove("error");
  peopleInput.classList.remove("error");

  resetBtn.disabled = true;
});
