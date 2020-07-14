const towel = 15.678;
const blanket = 123.965;
const pillow = 90.2345;

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

const arr = [towel, blanket, pillow];
const maxNum = Math.max(...arr);
document.querySelector("#max").textContent = `${maxNum}`;
const minNum = Math.min(...arr);
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

  const isEven = sumRound % 2 === 0 ? "парнa" : "непарнa";
  document.querySelector("#isEven").textContent = `${isEven}`;

  const sumRound100 = Math.round(sumRound / 100) * 100;
  document.getElementById("sumRound100").innerHTML = `${sumRound100}`;
}

remainderF = () => {
  const currency = document.getElementById("currency").value;
  const remainder = (currency - summary).toFixed(4);
  document.getElementById("remainder").textContent = `${remainder}`;
  const remainderDiscount = (currency - summaryRandom).toFixed(4);
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
  let average = 0;
  average = (summary / num).toFixed(2);
  document.querySelector("#average").textContent = `${average}`;
};

let summaryRandom = 0;
randomF = () => {
  const discount = Math.floor(Math.random() * 100);
  document.getElementById("discount").textContent = `${discount} %`;
  const sumRandom = ((summary * discount) / 100).toFixed(2);
  document.querySelector("#sumPaid").textContent = `${sumRandom}`;
  summaryRandom = sumRandom;
};
