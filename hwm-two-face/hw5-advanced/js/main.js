window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  for (let i = 1; i <= 10; i++) {
    const el = document.createElement("div");
    el.className = "card";
    el.id = "card" + i;
    el.innerHTML = "Завдання" + " " + i;
    container.append(el);
    const button = document.createElement("button");
    button.className = "start" + i;
    el.append(button);
    button.textContent = "Натисни мене";
    const p = document.createElement("p");
    el.append(p);
    p.className = "answer" + i;
  }

  function createInput(name, num, type) {
    const div = document.createElement("div");
    name.append(div);
    for (let j = 1; j <= num; j++) {
      const input = document.createElement("input");
      const span = document.createElement("span");
      div.append(span);
      div.append(input);
      input.className = "field" + j;
      input.type = type;
      input.value = "";
    }
  }

  createInput(card1, 3, "number");
  createInput(card8, 2, "text");
  const spans = document.getElementsByTagName("span");
  // for (let i = 0; i < spans.length; i++) {
  spans[0].textContent = "Введіть min значенння";
  spans[1].innerHTML = "Введіть max значення";
  spans[2].innerHTML = "Введіть довжину масиву";
  // }

  let num = [];
  function task1() {
    const min = document.querySelector(".field1").value;
    const max = document.querySelector(".field2").value;
    const length = document.querySelector(".field3").value;
    const randomNumber = document.querySelector(".answer1");
    const numbers = getRandomArray(length, +min, +max);
    num = numbers;
    // numbers.split(" ");
    randomNumber.textContent = `[ ${numbers} ]`;
    // numbers = `${numbers} `;
    return num;
  }

  function task2() {
    // const numbersArr = task1();
    const number = document.querySelector(".answer2");
    number.textContent = `${getAverage(num, length)}`;
  }

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
});
