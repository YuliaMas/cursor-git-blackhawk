// const towel = 15.678;
// const blanket = 123.965;
// const pillow = 90.2345;

// const pillow = prompt("Введіть ціну подушки:", "90.2345");
// const blanket = prompt("Введіть ціну одіяла:", "123.965");
// const towel = prompt("Введіть ціну рушника:", "15.678");

let towel = null;
let blanket = null;
let pillow = null;

while (pillow == null) {
  pillow = prompt("Input value", "90.2345");
  pillow = isNaN(pillow) ? null : parseInt(pillow);
}
while (blanket == null) {
  blanket = prompt("Input value", "123.965");
  blanket = isNaN(blanket) ? null : parseInt(blanket);
}
while (towel == null) {
  towel = prompt("Input value", "15.678");
  towel = isNaN(towel) ? null : parseInt(towel);
}

const chboxPillow = document.getElementById("Pillow");
const chboxBlanket = document.getElementById("Blanket");
const chboxTowel = document.getElementById("Towel");

let summary = 0;
function sum() {
  sumRoundF();
  let sumProducts = 0;
  if (chboxPillow.checked) {
    sumProducts += pillow;
  }
  if (chboxBlanket.checked) {
    sumProducts += blanket;
  }
  if (chboxTowel.checked) {
    sumProducts += towel;
  }
  document.querySelector("#sum").textContent = `${sumProducts}`;
  summary = sumProducts;
  average();
}

const arrProduct = [towel, blanket, pillow];
const maxNum = Math.max(...arrProduct);
document.querySelector("#max").textContent = `${maxNum}`;

const minNum = Math.min(...arrProduct);
document.querySelector("#min").textContent = `${minNum}`;

document.getElementById("Pillow1").textContent = `${pillow}`;
document.getElementById("Blanket1").textContent = `${blanket}`;
document.getElementById("Towel1").textContent = `${towel}`;

function sumRoundF() {
  let sumRound = 0; // = towel + blanket + pillow;

  if (chboxPillow.checked) {
    sumRound += Math.floor(pillow);
  }
  if (chboxBlanket.checked) {
    sumRound += Math.floor(blanket);
  }
  if (chboxTowel.checked) {
    sumRound += Math.floor(towel);
  }

  document.querySelector("#sumRound").textContent = `${sumRound}`;

  const isEven = sumRound % 2 === 0 ? "true" : "false";
  document.querySelector("#isEven").textContent = `${isEven}`;

  const sumRound100 = Math.round(sumRound / 100) * 100;
  document.getElementById("sumRound100").innerHTML = `${sumRound100}`;
}

remainderF = () => {
  const currency = document.getElementById("currency").value;
  const remainder = (currency - summary).toFixed(4);
  document.getElementById("remainder").textContent = `${remainder}`;

  const remainderDiscount = (currency - summaryDiscount).toFixed(2);
  document.getElementById(
    "remainderDiscount"
  ).textContent = `${remainderDiscount}`;
};

average = () => {
  let num = 0;
  if (chboxPillow.checked) {
    ++num;
  }
  if (chboxBlanket.checked) {
    ++num;
  }
  if (chboxTowel.checked) {
    ++num;
  }

  const average = (summary / num).toFixed(2);
  document.querySelector("#average").textContent = `${average}`;
};

let summaryDiscount = 0;
randomF = () => {
  const discount = Math.floor(Math.random() * 100);
  document.getElementById("discount").textContent = `${discount} %`;

  const discountFloat = (summary * discount) / 100;
  const sumDiscount = (summary - discountFloat).toFixed(2);
  document.querySelector("#sumPaid").textContent = `${sumDiscount}`;
  summaryDiscount = sumDiscount;

  const cost = Math.trunc(summary) / 2;

  if (discount > 0) {
    const proceeds = (cost - discountFloat).toFixed(2);
    document.querySelector("#clearProc").textContent = `${proceeds}`;
  } else {
    document.querySelector("#clearProc").textContent = `${cost}`;
  }
};
