function getMaxDigit(getNumber) {
  const number = getNumber.slice(``);
  return Math.max(...number);
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

function getChangedStr(getStr) {
  return getStr[0].toUpperCase() + getStr.slice(1).toLowerCase();
}

function deleteLetters(array, letter) {
  let arr = array.toLowerCase();
  return arr.split(letter.toLowerCase()).join("");
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
