function getMaxDigit(getNumber) {
  const number = getNumber.slice(``);
  return Math.max(...number);
}

function task1() {
  let getNumber = document.getElementById("number").value;
  const maxNum = document.querySelector("#maxNum");
  if (!getNumber || isNaN(getNumber)) {
    maxNum.textContent = `0`;
    alert("Введіть інше додатне число в 1-му завданні");
  }
  if (getNumber < 0) {
    getNumber = getNumber.slice(1);
  }

  maxNum.textContent = `${getMaxDigit(getNumber)}`;
}

function getNumPower(num, power) {
  let i = 1;
  let numToPower = 1;
  while (i <= power) {
    numToPower *= num; //3*3*3
    i++;
  }
  return numToPower;
}

function task2() {
  const getNumToPower = document.getElementById("numToPower").value;
  const getPower = document.getElementById("power").value;
  const setNumber = document.getElementById("setNum");
  if (getPower === "0") {
    alert("Введіть степінь");
  }
  setNumber.textContent = ` Число ${getNumToPower} в степені ${getPower} дорівнює ${getNumPower(
    getNumToPower,
    getPower
  )} `;
}

function getChangedStr(getStr) {
  return getStr[0].toUpperCase() + getStr.slice(1).toLowerCase();
}

function task3() {
  const getStrManipulate = document.getElementById("strManipulate").value;
  const paragraph = document.getElementById("paragraph");
  paragraph.textContent = `${getChangedStr(getStrManipulate)}`;
}

function deleteLetters(array, letter) {
  let arr = array.toLowerCase();
  return arr.split(letter).join("");
}
function task9() {
  const getStrArr = document.getElementById("arr").value;
  const getLetterDel = document.getElementById("delete").value;
  const paragraph2 = document.getElementById("paragraph2");
  paragraph2.textContent = `${deleteLetters(getStrArr, getLetterDel)}`;
}
function getSumWithoutTax() {}
const getResult = () => {
  task1();
  task2();
  task3();
  task9();
};
