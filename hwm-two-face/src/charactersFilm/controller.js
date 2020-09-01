import usersModule from "./characters";
import displayPeople from "./view";
import "./characters.css";
import "./img/maxresdefault.jpg";

const people = `people/?page=`;

export default function () {
  usersModule.getInfo(2, people).then(displayPeople);
}
