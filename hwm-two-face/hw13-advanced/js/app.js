window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".id-text");
  const idGen = document.getElementById("id-gen");
  const sizeIncrease = document.getElementById("sizeIncrease");
  const sizeDecrease = document.getElementById("sizeDecrease");
  const text = document.querySelector(".text");
  const p = document.createElement("p");
  p.className = "table";

  const increase = () => {
    if (text.style.fontSize < "96px") {
      text.style.fontSize = `${fontGenerator.next("up").value}px`;
      p.style.fontSize = `${fontGenerator.next("up").value}px`;
    }
  };

  const decrease = () => {
    if (text.style.fontSize > "14px") {
      text.style.fontSize = `${fontGenerator.next("down").value}px`;
      p.style.fontSize = `${fontGenerator.next("down").value}px`;
    }
  };

  const blockID = () => {
    p.innerText = "";
    p.innerHTML = `${idGenerator.next().value}`;
    container.appendChild(p);
  };

  idGen.addEventListener("click", () => {
    blockID();
  });

  sizeIncrease.addEventListener("click", () => {
    increase();
  });

  sizeDecrease.addEventListener("click", () => {
    decrease();
  });

  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "ArrowUp":
        increase();
        break;
      case "ArrowRight":
        increase();
        break;
      case "ArrowDown":
        decrease();
        break;
      case "ArrowLeft":
        decrease();
        break;
      case "Enter":
        blockID();
        break;
      case "Space":
        blockID();
        break;
    }
  });
});
