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
let errorText = document.querySelector(".error");
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
    tip = 0;
    showTip.innerHTML = "$0.00";
    total = tip + +bill.value / +people.value;
    showTotal.innerHTML = "$" + total.toFixed(2);
  }
}

function handleInput() {
  if (bill.value != 0 || people.value != 1) {
    reset.classList.add("active");
  }
  if (people.value == 0) {
    people.value = 1;
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
  } else {
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
  customText.innerHTML = "Custom";
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
  let regex = /^100$|^\d{1,3}$|^[0-9]$/;
  customButton.classList.remove("error");
  if (
    +e.target.innerHTML &&
    +e.target.innerHTML <= 100 &&
    +e.target.innerHTML.length <= 3 &&
    regex.test(+e.target.innerHTML)
  ) {
    customTip = +e.target.innerHTML / 100;
    tip = bill.value * (customTip / people.value);
    showTip.innerHTML = `\$${+tip.toFixed(2) || "0.00"}`;
    total = +tip + +bill.value;
    showTotal.innerHTML = `\$${
      +total.toFixed(2) || "0.00"
    }`;
  } else if (
    +e.target.innerHTML > 100 ||
    +e.target.innerHTML.length > 3 ||
    !regex.test(+e.target.innerHTML)
  ) {
    e.target.innerHTML = "";
    customButton.classList.add("error");
    showTip.innerHTML = "$0.00";
    showTotal.innerHTML = "$0.00";
  } else {
    showTip.innerHTML = "$0.00";
    showTotal.innerHTML = "$0.00";
  }
}
