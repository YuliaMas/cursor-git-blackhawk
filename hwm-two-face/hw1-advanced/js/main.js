// const towel = 15.678;
// const blanket = 123.965;
// const pillow = 90.2345;

// const pillow = +prompt("Введіть ціну подушки:", "90.2345");
// const blanket = +prompt("Введіть ціну одіяла:", "123.965");
// const towel = +prompt("Введіть ціну рушника:", "15.678");

let pillow;
let blanket;
let towel;

priceVoid = (i) => {
  let productPrice = null;
  let arrName = ["подушки", "одіяла", "рушника"];
  let arrPrice = ["90.2345", "123.965", "15.678"];

  while (productPrice === null) {
    productPrice = prompt(`Введіть ціну ${arrName[i]}`, `${arrPrice[i]}`);
    productPrice =
      isNaN(productPrice) || productPrice === "" || productPrice === null
        ? null
        : parseFloat(productPrice);
  }
  return productPrice;
};

pillow = priceVoid(0);
blanket = priceVoid(1);
towel = priceVoid(2);

document.getElementById("Pillow1").textContent = `${pillow}`;
document.getElementById("Blanket1").textContent = `${blanket}`;
document.getElementById("Towel1").textContent = `${towel}`;

const arrProduct = [towel, blanket, pillow];
const maxNum = Math.max(...arrProduct);
document.querySelector("#max").textContent = `${maxNum}`;

const minNum = Math.min(...arrProduct);
document.querySelector("#min").textContent = `${minNum}`;

// while (blanket == null) {
//   blanket = prompt("Введіть ціну одіяла", "123.965");
//   blanket = isNaN(blanket) ? null : parseInt(blanket);
// }
// while (towel == null) {
//   towel = prompt("Введіть ціну рушника", "15.678");
//   towel = isNaN(towel) ? null : parseInt(towel);
// }

const chboxPillow = document.getElementById("Pillow");
const chboxBlanket = document.getElementById("Blanket");
const chboxTowel = document.getElementById("Towel");

let summary = 0;
function sum() {
  let num = 0;
  let sumProducts = 0;
  const number1 = document.getElementById("number1").value;
  const number2 = document.getElementById("number2").value;
  const number3 = document.getElementById("number3").value;

  if (chboxPillow.checked) {
    num += +number1;
    sumProducts += pillow * +number1;
  }
  if (chboxBlanket.checked) {
    num += +number2;
    sumProducts += blanket * +number2;
  }
  if (chboxTowel.checked) {
    num += +number3;
    sumProducts += towel * +number3;
  }
  document.querySelector("#sum").textContent = `${sumProducts}`;

  summary = sumProducts;
  average(num);

  sumRoundF(number1, number2, number3);
}

function sumRoundF(number1, number2, number3) {
  let sumRound = 0; // = towel + blanket + pillow;

  if (chboxPillow.checked) {
    pillow = pillow * +number1;
    sumRound += Math.floor(pillow);
  }
  if (chboxBlanket.checked) {
    blanket = blanket * +number2;
    sumRound += Math.floor(blanket);
  }
  if (chboxTowel.checked) {
    towel = towel * +number3;
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

average = (num) => {
  // let num = 0;
  // if (chboxPillow.checked) {
  //   const number1 = document.getElementById("number1").value;
  //   num += +number1;
  //   // ++num;
  // }
  // if (chboxBlanket.checked) {
  //   const number2 = document.getElementById("number2").value;
  //   num += +number2;
  //   // ++num;
  // }
  // if (chboxTowel.checked) {
  //   const number3 = document.getElementById("number3").value;
  //   num += +number3;
  //   // ++num;
  // }

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
