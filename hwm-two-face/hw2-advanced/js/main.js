const getNumN = document.getElementById("numN");
const getNumM = document.getElementById("numM");

const checkNum = (char) => {
  let num = null;
  while (num === null) {
    num = +prompt(`Enter your number  ${char}:`, "0");
    num = isNaN(num) ? null : parseInt(num);
  }
  return num;
};

N = checkNum("N");
M = checkNum("M");

let a = confirm("Пропускати парні числа чи ні?");
alert(a);

getNumN.textContent = N;
getNumM.textContent = M;
