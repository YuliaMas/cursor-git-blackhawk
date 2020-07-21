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
  paragraph.textContent = `${getChangedStr(getStrManipulate)}`;
}
