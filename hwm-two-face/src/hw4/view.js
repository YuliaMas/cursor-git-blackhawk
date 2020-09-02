import { pairs, pairTheme, markPupil, projectMark } from "./studentsCard";
import "./students.css";

const card1 = document.querySelectorAll(".p1");
const card2 = document.querySelectorAll(".p2");
const card3 = document.querySelectorAll(".p3");
const card4 = document.querySelectorAll(".p4");

function setPairs(pairs) {
  let i = 0;
  for (let pair of pairs) {
    const pair = `${i + 1} пара: ${pairs[i].join(" , ")}`;
    card1[i].textContent = `${pair}`;
    i++;
  }
}

function setThemes(pairTheme) {
  let i = 0;
  for (let some of pairTheme) {
    const pairSomeone = `${i + 1} пара: ${pairTheme[i].join(" , ")}`;
    card2[i].textContent = `${pairSomeone}`;
    i++;
  }
}

function setEveryMark(markPupil) {
  let i = 0;
  for (let mark of markPupil) {
    const markEvery = `${i + 1}: ${markPupil[i].join(" , ")}`;
    card3[i].textContent = `${markEvery}`;
    i++;
  }
}

function setProjectMark(projectMark) {
  let i = 0;
  for (let mark of projectMark) {
    const project = `${i + 1} пара: ${projectMark[i].join(" , ")}`;
    card4[i].textContent = `${project}`;
    i++;
  }
}

const setCardsBtn = document.getElementById("setCardsBtn");

export default function () {
  setCardsBtn.addEventListener("click", () => {
    card1.textContent = setPairs(pairs);
    card2.textContent = setThemes(pairTheme);
    card3.textContent = setEveryMark(markPupil);
    card4.textContent = setProjectMark(projectMark);
  });
}
