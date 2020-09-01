import usersModule from "./characters";
import displayPeople from "./view";
import "./characters.css";
import "./img/maxresdefault.jpg";

const people = `people/?page=`;
const btnInfo = document.getElementById("btn");

export default function () {
  btnInfo.addEventListener("click", () => {
    const peopleId = document.getElementById("filmId").value;
    if (peopleId < 1 || peopleId > 9) return;
    usersModule.getInfo(peopleId, people).then(displayPeople);
  });
}
