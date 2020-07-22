// function 1
function getMaxDigit(getNumber) {
  const number = getNumber.slice(``);
  return Math.max(...number);
}

// function 2
function getNumPower(num, power) {
  let i = 1;
  let numToPower = 1;
  while (i <= power) {
    numToPower *= num; //3*3*3
    i++;
  }
  return numToPower;
}

// function 3
function getChangedStr(getStr) {
  return getStr[0].toUpperCase() + getStr.slice(1).toLowerCase();
}

// function 4
function getSumWithoutTax(salary) {
  const tax1 = 18;
  const tax2 = 1.5;
  const tax = tax1 + tax2;
  return (salary - (salary * tax) / 100).toFixed(2);
}

// function 5
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function 6
function countLetter(str, item) {
  str = str.toLowerCase();
  const char = item.toLowerCase();
  const arr = str.split("");

  let count = 0;
  arr.sort().reduce((accumulator, current) => {
    // let arrCharLength = accumulator.length;
    if (current === char) {
      accumulator.push(current);
      count++;
    }
    return accumulator;
  }, []);
  return count;
}

// function 7
function convertCurrency(str, val) {
  let current = Number(str.replace(/\D+/g, ""));
  const regexUSA = /[$]/g;
  const regexUA = /[UAH]/g;
  if (str.match(regexUSA)) {
    let current = Number(str.replace(/\D+/g, ""));
    let sum = current * val;
    return sum + "UAH";
  } else if (str.toUpperCase().match(regexUA)) {
    let sum = current / val;
    return sum + "$";
  } else {
    return "error";
  }
}

// function 8
function randomPassword(pLength) {
  let arr = [];
  if (pLength <= 0) return 0;
  do {
    const password = Math.floor(Math.random() * 10);
    arr.push(password);
  } while (arr.length < pLength);
  return arr.join("");
}

// function 9
function deleteLetters(array, letter) {
  const arr = array.toLowerCase();
  return arr.split(letter.toLowerCase()).join("");
}

// function 10
function isPalyndrom(str) {
  str = str.toLowerCase().replace(/\s/g, "");
  return str === str.split("").reverse().join("");
}

// function 11
function deleteDuplicateLetter(stri) {
  let str = stri.split("");
  let res = str.filter(function (val, i, str) {
    return str.lastIndexOf(val) === str.indexOf(val);
  });

  console.log(res);
  return res.join("");
}

//Result - button
const getResult = () => {
  task1();
  task2();
  task3();
  task4();
  task5();
  task6();
  task7();
  task8();
  task9();
  task10();
  task11();
};
