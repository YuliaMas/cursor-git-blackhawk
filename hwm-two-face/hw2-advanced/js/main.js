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
alert(isEven);

let sumNumbers;

if (!isEven) {
  alert(sumTo(maxM));
} else if (isEven && minN % 2 === 0) {
  alert(sumNtoM(maxM));
} else if (isEven && minN % 2 !== 0) {
  alert(sumOdd(maxM));
}

function sumTo(maxM) {
  let sum = 0;
  for (let i = minN; i <= maxM; i++) {
    sum += i;
  }
  // return sum;
  sumNumbers = sum;
  return sumNumbers;
}

function sumNtoM(maxM) {
  let sum = 0;
  for (let i = minN + 1; i <= maxM; i += 2) {
    sum += i;
  }
  // return sum;
  sumNumbers = sum;
  return sumNumbers;
}

function sumOdd(maxM) {
  let sum = 0;
  for (let i = minN; i <= maxM; i += 2) {
    sum += i;
  }
  sumNumbers = sum;
  return sumNumbers;
}

getSum.textContent = sumNumbers;
