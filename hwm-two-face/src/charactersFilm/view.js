import photoCharacters from "./PhotoChar.js";

const container = document.querySelector(".people");
const title = document.querySelector(".title");

function displayPeople(people = []) {
  container.innerHTML = "";
  title.innerText = "Characters";
  people.map((person) => {
    displayCharacterInfo(person);
  });
}

function displayCharacterInfo(person) {
  const personElement = document.createElement("div");
  personElement.className = "person around";
  const personIcon = document.createElement("div");
  personIcon.className = "icon";
  switch (person.gender) {
    case "male":
      person.gender += `  ♂`;
      break;
    case "female":
      person.gender += `  ♀`;
      break;
  }

  createInfoChar(personElement, person);
  findImg(person, personIcon);

  container.append(personElement);
  personElement.appendChild(personIcon);
}

function createInfoChar(element, person) {
  element.innerHTML = `
    <div>
      <h3> <span> Name: </span> ${person.name} </h3>
      <h4> <span> Birthday: </span> ${person["birth_year"]} </h4>
      <h4> <span> Gender: </span> ${person["gender"]} </h4>
     </div>
    `;
}

function findImg(characters, personIcon) {
  const image = document.createElement("img");
  image.className = "iconCharacter";

  for (let i = 0; i < Object.keys(photoCharacters).length; i++) {
    const httpsUrl = characters["url"].replace("http", "https");
    if (httpsUrl === Object.keys(photoCharacters)[i]) {
      image.src = Object.values(photoCharacters)[i].replace(
        "./",
        "./hw12-advanced/"
      );
      personIcon.appendChild(image);
    }
  }
}

export default displayPeople;
