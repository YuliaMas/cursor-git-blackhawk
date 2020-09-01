import { createIdGenerator, newFontGenerator } from "./generator";
import "./generator.css";
import "./img/FAVPNG_sky-blue-cloud-desktop-wallpaper_ZZhWpfAQ.png";
import "./img/cloud_PNG24.png";
import "./img/mountain_PNG2.png";

const fontGenerator = newFontGenerator(14);
const idGenerator = createIdGenerator();

const container = document.querySelector(".id-text");
const idGen = document.getElementById("id-gen");
const sizeIncrease = document.getElementById("sizeIncrease");
const sizeDecrease = document.getElementById("sizeDecrease");
const text = document.querySelector(".text");
const p = document.createElement("p");
p.className = "table";

export default function () {
  function parallax(event) {
    this.querySelectorAll(".layer").forEach((layer) => {
      const speed = layer.getAttribute("data-speed");
      layer.style.transform = `translateX(${(event.clientX * speed) / 2000}px`;
    });
  }

  document.addEventListener("mousemove", parallax);

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
}
