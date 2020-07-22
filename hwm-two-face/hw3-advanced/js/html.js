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

function task2() {
  const getNumToPower = document.getElementById("numToPower").value;
  const getPower = document.getElementById("power").value;
  const setNumber = document.getElementById("setNum");
  if (getPower <= 0) {
    alert("Введіть іншу степінь");
  }
  setNumber.textContent = ` Число ${getNumToPower} в степені ${getPower} дорівнює ${getNumPower(
    getNumToPower,
    getPower
  )} `;
}

function task3() {
  const getStrManipulate = document.getElementById("strManipulate").value;
  const paragraph = document.getElementById("paragraph");
  paragraph.textContent = ` Ім'я:  ${getChangedStr(getStrManipulate)}`;
}

function task4() {
  const sal1 = document.querySelector(".salary-1").value;
  const sal2 = document.querySelector(".salary-2").value;
  const sal3 = document.querySelector(".salary-3").value;
  const tableTd = document.querySelectorAll("table tbody td");
  tableTd[1].textContent = `${getSumWithoutTax(sal1)}`;
  tableTd[3].textContent = `${getSumWithoutTax(sal2)}`;
  tableTd[5].textContent = `${getSumWithoutTax(sal3)}`;
}

function task5() {
  const numFrom = document.querySelector(".random1").value;
  const numTo = document.querySelector(".random2").value;
  const randomNumber = document.querySelector(".random3");
  randomNumber.textContent = `  Випадкове число з діапазону ( ${numFrom} , ${numTo} ) буде  ${getRandomNumber(
    numFrom,
    numTo
  )}`;
}

function task6() {
  const getStr = document.getElementById("str").value;
  const getLetter = document.getElementById("letter").value;
  const count = document.getElementById("count");
  count.textContent = `${countLetter(
    getStr,
    getLetter
  )}  рази(ів)  буква "${getLetter}"  повторюється у слові `;
}

function task7() {
  const getCurrency = document.getElementById("currency").value;
  const getVal = document.getElementById("val").value;
  const setConvertCur = document.getElementById("convert");
  setConvertCur.textContent = ` => ${convertCurrency(getCurrency, getVal)}`;
}

function task8() {
  const getPassLength = document.querySelector(".random4").value;
  const setPass = document.getElementById("password");
  setPass.textContent = ` Ваш пароль: ${randomPassword(getPassLength)}`;
}

function task9() {
  const getStrArr = document.getElementById("arr").value;
  const getLetterDel = document.getElementById("delete").value;
  const paragraph2 = document.getElementById("paragraph2");
  paragraph2.textContent = `Ваш текст... ${deleteLetters(
    getStrArr,
    getLetterDel
  )} `;
}

function task10() {
  const getSentence = document.querySelector("#palyndrom").value;
  const setBoolean = document.getElementById("boolean");
  setBoolean.textContent = `Чи є це паліндромом ?   ${isPalyndrom(
    getSentence
  )}`;
}

function task11() {
  const getSentences = document.getElementById("sentences").value;
  const setDelDuplicate = document.getElementById("delDouble");
  setDelDuplicate.textContent = ` Модифікований текст... ${deleteDuplicateLetter(
    getSentences
  )} `;
}
