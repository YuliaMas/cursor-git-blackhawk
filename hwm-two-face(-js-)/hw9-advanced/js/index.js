window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const randomColorBlocks = document.querySelector(".colorBlocks");
  const stopButton = document.querySelector(".stop");
  const setBlocks = document.querySelector(".newBlocks");
  let timerId;

  const setBg = (elem) => {
    elem.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const setSquareContainer = () => {
    for (let i = 0; i < 25; i++) {
      container.insertAdjacentHTML("beforeend", `<div class="square"></div>`);
    }
  };

  const setRandomColor = () => {
    const divSquares = document.querySelectorAll(".square");
    divSquares.forEach((square) => setBg(square));
  };

  function stop() {
    clearInterval(timerId);
  }

  setBlocks.addEventListener("click", () => {
    setBlocks.setAttribute("disabled", "disabled");
    setSquareContainer();
  });

  randomColorBlocks.addEventListener("click", () => {
    randomColorBlocks.setAttribute("disabled", "disabled");
    timerId = setInterval(setRandomColor, 1000);
  });

  stopButton.addEventListener("click", () => {
    randomColorBlocks.removeAttribute("disabled");
    `${stop()}`;
  });
});
