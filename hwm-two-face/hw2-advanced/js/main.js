const getNumN = document.getElementById("numN");
const getNumM = document.getElementById("numM");
const getSum = document.querySelector("#sum");

const checkNum = (char) => {
  let num = null;
  while (num === null) {
    num = +prompt(`Enter your number  ${char}:`, "0");
    num = isNaN(num) ? null : parseInt(num);
  }
  return num;
};

render = () => {
  getNumN.textContent = N;
  getNumM.textContent = M;
};

const N = checkNum("N");
const M = checkNum("M");

render();

const minN = Math.min(M, N);
const maxM = Math.max(M, N);

let isEven = confirm("Пропускати парні числа чи ні?");
let sumNumbers = 0;

if (!isEven) {
  sumNumbers = sumTo(maxM);
  alert(sumNumbers);
} else if (isEven) {
  sumNumbers = sumOdd(maxM);
  alert(sumNumbers);
}

function sumTo(maxM) {
  let sum = 0;
  for (let i = minN; i <= maxM; i++) {
    sum += i;
  }
  return sum;
}

function sumOdd(maxM) {
  let sum = 0;
  switch (minN % 2) {
    case 0:
      for (let i = minN + 1; i <= maxM; i += 2) sum += i;
      break;
    case 1:
      for (let i = minN; i <= maxM; i += 2) sum += i;
      break;
  }
  return sum;
}

getSum.textContent = sumNumbers;
