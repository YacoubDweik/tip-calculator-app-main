let bill = document.querySelector("#bill");
let buttonBox = document.querySelector(
  ".inputs > div:nth-child(2) .buttons"
);
let buttons = document.querySelectorAll(".inputs button");
let people = document.querySelector("#people");
let showTip = document.querySelector(
  ".show .values div:first-child .total"
);
let showTotal = document.querySelector(
  ".show .values div:last-child .total"
);
let reset = document.querySelector(".show button");
let customButton = document.querySelector(
  ".buttons button:last-child"
);
let customText = document.querySelector(
  ".buttons button:last-child p"
);
let customTip = 0;
let tip = 0;
let total = 0;

buttonBox.addEventListener("click", handleClick);
bill.addEventListener("input", handleInput);
people.addEventListener("input", handleInput);
customButton.addEventListener("click", handleCustom);
customText.addEventListener("input", handleCustomInput);

function handleClick(e) {
  customButton.classList.remove("error");
  buttons.forEach((button) =>
    button.classList.remove("active")
  );
  if (e.target != e.currentTarget) {
    if (e.target == customText) {
      customButton.classList.add("active");
    } else {
      customText.innerHTML = "Custom";
      customText.contentEditable = "false";
    }
    e.target.classList.add("active");
    e.target.focus();
    tip = bill.value * (e.target.value / people.value);
    tip = +tip.toFixed(2) || "0.00";
    showTip.innerHTML = "$" + tip;
    total = +tip + +bill.value;
    total = +total.toFixed(2) || "0.00";
    showTotal.innerHTML = "$" + total;
  } else {
    customText.innerHTML = "Custom";
    customText.contentEditable = "false";
  }
}

function handleInput() {
  if (bill.value != 0 || people.value != 1) {
    reset.classList.add("active");
  }
  let activeTip =
    document.querySelector(".buttons button.active") || 0;
  if (activeTip == customButton) {
    activeTip = +customText.innerHTML / 100;
    tip = (+bill.value * +activeTip) / +people.value;
    showTip.innerHTML = "$" + tip.toFixed(2);
    total = +tip + +bill.value / +people.value;
    showTotal.innerHTML = "$" + total.toFixed(2);
  } else if (activeTip) {
    tip = (+bill.value * +activeTip.value) / +people.value;
    showTip.innerHTML = "$" + tip.toFixed(2);
    total = +tip + +bill.value / +people.value;
    showTotal.innerHTML = "$" + total.toFixed(2);
  }
  if (reset.classList.contains("active")) {
    reset.addEventListener("click", handleReset);
  }
}

function handleReset() {
  buttons.forEach((button) =>
    button.classList.remove("active")
  );
  bill.value = 0;
  people.value = 1;
  showTip.innerHTML = "$0.00";
  showTotal.innerHTML = "$0.00";
  reset.classList.remove("active");
}

function handleCustom() {
  customText.focus();
  customText.innerHTML = "";
  customText.contentEditable = "true";
}

function handleCustomInput(e) {
  customButton.classList.remove("error");
  if (+e.target.innerHTML && +e.target.innerHTML < 1001) {
    customTip = +e.target.innerHTML / 100;
    tip = bill.value * (customTip / people.value);
    showTip.innerHTML = `\$${+tip.toFixed(2) || "0.00"}`;
    total = +tip + +bill.value;
    showTotal.innerHTML = `\$${
      +total.toFixed(2) || "0.00"
    }`;
  } else if (+e.target.innerHTML > 1000) {
    e.target.innerHTML = "";
    customButton.classList.add("error");
    showTip.innerHTML = "$0.00";
    showTotal.innerHTML = "$0.00";
  } else {
    showTip.innerHTML = "$0.00";
    showTotal.innerHTML = "$0.00";
  }
}