window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");

  for (let i = 1; i <= 10; i++) {
    const el = document.createElement("div");
    const pTask = document.createElement("p");
    const button = document.createElement("button");
    const p = document.createElement("p");
    el.className = "card";
    el.id = "card" + i;
    el.innerHTML = "Завдання" + " " + i;
    el.append(pTask);
    pTask.className = "task" + i;
    container.append(el);
    button.className = "start" + i;
    el.append(button);
    button.textContent = "Виконати";
    el.append(p);
    p.className = "answer" + i;
  }

  function createInput(name, num, typeName) {
    const div = document.createElement("div");
    name.append(div);
    for (let j = 1; j <= num; j++) {
      const input = document.createElement("input");
      const span = document.createElement("span");
      div.append(span);
      div.append(input);
      input.className = "field" + j;
      input.type = typeName;
      input.value = "";
      input.required = true;
    }
  }

  function createTextarea(name, idName, text) {
    const div = document.createElement("div");
    name.append(div);
    const textarea = document.createElement("textarea");
    const span = document.createElement("span");
    div.append(span);
    div.append(textarea);
    textarea.id = idName;
    textarea.required = true;
    textarea.placeholder = text;
  }

  const getText = "Are you fucking kidding? It's bullshit! Holy shit!";
  const div3Let = "Commander , Live ";
  const generateWord = "Map , island , ol";
  createInput(card1, 3, "number");
  createTextarea(card8, "badWord", getText);
  createTextarea(card9, "divWord", div3Let);
  createTextarea(card10, "getWordTen", generateWord);

  const spans = document.getElementsByTagName("span");
  const pTask = "Масив значень дивись в 1-му завданні...";
  const pTask2 = document.querySelector(".task2");
  const pTask3 = document.querySelector(".task3");
  const pTask4 = document.querySelector(".task4");
  const pTask5 = document.querySelector(".task5");
  const pTask6 = document.querySelector(".task6");
  const pTask7 = document.querySelector(".task7");
  spans[0].textContent = "Введіть min значенння:";
  spans[1].innerHTML = "Введіть max значення:";
  spans[2].innerHTML = "Введіть довжину масиву:";
  spans[3].innerHTML = "Введіть речення, яке містить слова 'shit' і/чи 'fuck':";
  spans[4].innerHTML = "Введіть слово:";
  spans[5].innerHTML = "Введіть слово:";
  pTask2.textContent = pTask;
  pTask3.textContent = pTask;
  pTask4.textContent = pTask;
  pTask5.textContent = pTask;
  pTask6.textContent = pTask;
  pTask7.textContent = pTask;

  /* - - - - - - - - - - - - - - Tasks - - - - - - - - - - - - - - - - - - - - - - -*/
  let num;
  function task1() {
    const min = document.querySelector(".field1").value;
    const max = document.querySelector(".field2").value;
    const length = document.querySelector(".field3").value;
    const randomNumber = document.querySelector(".answer1");
    const numbers = getRandomArray(length, parseInt(min), parseInt(max));
    num = numbers;
    if (+max < +min) {
      return (randomNumber.textContent = `Введіть більше число в полі max`);
    }
    if (length <= 0) {
      return (randomNumber.textContent =
        "Введіть  ціле додатне число в полі довжина масиву");
    }
    randomNumber.textContent = `[ ${numbers.join(" , ")} ]`;
    return num;
  }

  function task2() {
    const moda = document.querySelector(".answer2");
    if (isNaN(num) === true) {
      moda.textContent = " В 1-му завданні помилка, виправте , будь ласка!";
    }
    moda.textContent = `Мода : ${getModa(num).join(" , ")}`;
  }

  function task3() {
    const number = document.querySelector(".answer3");
    if (isNaN(num) === true) {
      number.textContent = " В 1-му завданні помилка, виправте , будь ласка!";
    }
    number.textContent = `Середнє арифметичне значення: ${getAverage(
      num
    ).toFixed(2)}`;
  }

  function task4() {
    const median = document.querySelector(".answer4");
    if (isNaN(num) === true) {
      median.textContent = " В 1-му завданні помилка, виправте , будь ласка!";
    }
    median.textContent = ` Mедіана:  ${getMedian(num)}`;
  }

  function task5() {
    const filterEven = document.querySelector(".answer5");
    if (isNaN(num) === true) {
      filterEven.textContent =
        " В 1-му завданні помилка, виправте , будь ласка!";
    }
    filterEven.textContent = `Непарні числа: [ ${filterEvenNumbers(num)} ]`;
  }

  function task6() {
    const positiveNumbers = document.querySelector(".answer6");
    if (isNaN(num) === true) {
      positiveNumbers.textContent =
        " В 1-му завданні помилка, виправте , будь ласка!";
    }
    positiveNumbers.textContent = `Кількість додатних чисел:  ${countPositiveNumbers(
      num
    )}`;
  }

  function task7() {
    const dividedByFive = document.querySelector(".answer7");
    if (isNaN(num) === true) {
      dividedByFive.textContent =
        " В 1-му завданні помилка, виправте , будь ласка!";
    }
    dividedByFive.textContent = `Числа кратні 5: [ ${getDividedByFive(num)} ]`;
  }

  function task8() {
    const getbadWordsText = document.querySelector("#badWord").value;
    const setBadWords = document.querySelector(".answer8");
    setBadWords.textContent = `Модифіковане речення:  ${replaceBadWords(
      getbadWordsText
    )}`;
  }

  function task9() {
    const text = document.querySelector("#divWord").value;
    const setWord = document.querySelector(".answer9");
    setWord.textContent = `Розбите слово:[ ${divideByThree(text).join(
      " , "
    )} ]`;
  }

  function task10() {
    const text = document.querySelector("#getWordTen").value;
    const setWordTen = document.querySelector(".answer10");
    setWordTen.textContent = `${generateCombinations(text).join(" , ")}`;
  }

  /* - - - - - - - - - - - - - - Buttons click - - - - - - - - - - - - - -*/

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("start1")) {
      `${task1()}`;
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("start2")) {
      `${task2()}`;
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("start3")) {
      `${task3()}`;
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("start4")) {
      `${task4()}`;
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("start5")) {
      `${task5()}`;
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("start6")) {
      `${task6()}`;
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("start7")) {
      `${task7()}`;
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("start8")) {
      `${task8()}`;
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("start9")) {
      `${task9()}`;
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("start10")) {
      `${task10()}`;
    }
  });
});
