window.addEventListener("DOMContentLoaded", () => {
  const setBg = (elem) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    elem.style.backgroundColor = "#" + randomColor;
  };

  const container = document.getElementById("container");
  for (let i = 1; i <= 25; i++) {
    container.insertAdjacentHTML("afterbegin", `<div class="square"></div>`);
    const divSquares = document.querySelector(" .square");
    setInterval(() => {
      setBg(divSquares);
    }, 1000);
  }
});
