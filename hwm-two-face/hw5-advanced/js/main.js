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
  createInput(card1, 3, "number");
  createTextarea(card8, "badWord", getText);
  createTextarea(card9, "divWord", div3Let);

  // const span = document.createElement("span");
  // div.append(span);
  // for (let i = 0; i < spans.length; i++) {
  const spans = document.getElementsByTagName("span");
  const pTask = "Масив значень дивись в 1-му завданні:";
  const pTask2 = document.querySelector(".task2");
  const pTask3 = document.querySelector(".task3");
  const pTask4 = document.querySelector(".task4");
  const pTask5 = document.querySelector(".task5");
  const pTask6 = document.querySelector(".task6");
  const pTask7 = document.querySelector(".task7");
  const pTask8 = document.querySelector(".task8");
  spans[0].textContent = "Введіть min значенння:";
  spans[1].innerHTML = "Введіть max значення:";
  spans[2].innerHTML = "Введіть довжину масиву:";
  spans[3].innerHTML = "Введіть речення, яке містить слова 'shit' і/чи 'fuck':";
  spans[4].innerHTML = "Введіть слово:";
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
    const numbers = getRandomArray(length, +min, +max);
    num = numbers;
    if (max < min) {
      return (randomNumber.textContent = `Введіть більше число в полі max`);
    }
    if (length <= 0) {
      return (randomNumber.textContent =
        "Введіть  ціле додатне число в полі довжина масиву");
    }
    // numbers.split(" ");
    randomNumber.textContent = `[ ${numbers.join(" , ")} ]`;
    // numbers = `${numbers} `;
    return num;
  }

  function task2() {
    const moda = document.querySelector(".answer2");
    moda.textContent = `${getModa(num)}`;
  }

  function task3() {
    const number = document.querySelector(".answer3");
    number.textContent = `${getAverage(num)}`;
  }

  function task4() {
    const median = document.querySelector(".answer4");
    median.textContent = `${getMedian(num)}`;
  }

  function task5() {
    const filterEven = document.querySelector(".answer5");
    filterEven.textContent = `${filterEvenNumbers(num)}`;
  }

  function task6() {
    const filterEven = document.querySelector(".answer6");
    filterEven.textContent = `${countPositiveNumbers(num)}`;
  }

  function task7() {
    const filterEven = document.querySelector(".answer7");
    filterEven.textContent = `${getDividedByFive(num)}`;
  }

  function task8() {
    const text = document.querySelector("#badWord").value;
    const setBadWords = document.querySelector(".answer8");
    setBadWords.textContent = `${replaceBadWords(text)}`;
  }

  function task9() {
    const text = document.querySelector("#divWord").value;
    const setWord = document.querySelector(".answer9");
    setWord.textContent = `${divideByThree(text)}`;
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
});
