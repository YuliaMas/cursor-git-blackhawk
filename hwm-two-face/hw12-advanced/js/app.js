const btnInfo = document.getElementById("btn");
const btnFilm = document.getElementById("btnFilm");
const btnPlanet = document.getElementById("btnPlanet");
const btnTrans = document.getElementById("btnTrans");
const btnPlanetTrans = document.getElementById("btnPlanetTrans");
const container = document.querySelector(".people");
const title = document.querySelector(".title");
const data = {
  name: "whrascwo",
  birthday: "rhahrcaoac_roworarc",
  gender: "rrwowhwaworc",
  climate: "oaanahscraaowo",
  terrain: "aoworcrcraahwh",
  population: "akooakhuanraaoahoowh",
};

function displayCharacterInfo(person) {
  const personElement = document.createElement("div");
  const personIcon = document.createElement("div");
  personElement.className = "person around";
  personIcon.className = "icon";
  personElement.innerHTML = `
    <div>
      <h3> <span> Name: </span> ${person.name} </h3>
      <h4> <span> Birthday: </span> ${person["birth_year"]} </h4>
      <h4> <span> Gender: </span> ${person["gender"]} </h4>
     </div>
    `;
  container.append(personElement);
  personElement.appendChild(personIcon);
  findImg(person, personIcon);
}

function displayPeople(people = []) {
  container.innerHTML = "";
  title.innerText = "Characters";
  people.map((person) => {
    displayCharacterInfo(person);
  });
}

function displayFilmCharacters(characters = {}) {
  container.innerHTML = "";
  title.innerText = "Characters";
  characters.map((char) => {
    axios.get(char).then((char) => {
      characters = char.data;
      displayCharacterInfo(characters);
    });
  });
}
// ---
function displayPlanet(planets = []) {
  container.innerHTML = "";
  title.innerText = "Planets";
  planets.map((planet) => {
    const personElement = document.createElement("div");
    personElement.className = "person";
    personElement.innerHTML = `
    <div>
      <h3> <span> Name: </span> ${planet.name}</h3>
      <h4> <span> Climate: </span> ${planet["climate"]}</h4>
      <h4> <span> Terrain: </span> ${planet["terrain"]}</h4>
      <h4> <span> Population: </span> ${planet["population"]}</h4>
     </div>
    `;
    container.append(personElement);
  });
}

function displayPeopleTranslate(people = []) {
  container.innerHTML = "";
  title.innerText = "Characters";

  people.map((person) => {
    const personElement = document.createElement("div");
    const personIcon = document.createElement("div");
    personElement.className = "person around";
    personElement.innerHTML = `
    <div>
      <h3> <span> Whrascwo: </span> ${person.whrascwo}</h3>
      <h4> <span> Rhahrcaoac_roworarc: </span> ${person["rhahrcaoac_roworarc"]}</h4>
      <h4> <span> Rrwowhwaworc: </span> ${person["rrwowhwaworc"]}</h4>
    </div>
    `;
    container.append(personElement);
    personIcon.className = "icon";
    container.append(personElement);
    personElement.appendChild(personIcon);
    findImgTranslate(person, personIcon);
  });
}

function displayPlanetsTranslate(planets = []) {
  container.innerHTML = "";
  title.innerText = "Planets";

  planets.map((planet) => {
    const personElement = document.createElement("div");
    // const personIcon = document.createElement("div");
    personElement.className = "person";
    personElement.innerHTML = `
    <div>
      <h3> <span> Whrascwo: </span> ${planet.whrascwo}</h3>
      <h4> <span> Oaanahscraaowo: </span> ${planet["oaanahscraaowo"]}</h4>
      <h4> <span> Aoworcrcraahwh: </span> ${planet["aoworcrcraahwh"]}</h4>
      <h4> <span> Akooakhuanraaoahoowh: </span> ${planet["akooakhuanraaoahoowh"]}</h4>
    </div> 
    `;
    container.append(personElement);
    // personIcon.className = "icon";
    // container.append(personElement);
    // personElement.appendChild(personIcon);
    // findImgTranslate(planet, personIcon);
  });
}

function findImg(characters, personIcon) {
  const image = document.createElement("img");
  image.className = "iconCharacter";
  for (let i = 0; i < Object.keys(photoCharacters).length; i++) {
    const httpsUrl = characters["url"].replace("http", "https");
    if (httpsUrl === Object.keys(photoCharacters)[i]) {
      image.src = Object.values(photoCharacters)[i];
      personIcon.appendChild(image);
    }
  }
}

function findImgTranslate(person, personIcon) {
  const image = document.createElement("img");
  image.className = "iconCharacter";
  for (let key in wookieePhoto) {
    if (person["hurcan"] === key) {
      image.src = wookieePhoto[key];
      personIcon.appendChild(image);
    }
  }
}

function paginationInit() {
  let valuePage = 1;
  let currentPage = document.getElementById("filmId");

  document.getElementById("prev").addEventListener("click", () => {
    valuePage = +currentPage.value - 1;
    currentPage.value = `${valuePage}`;
    if (+currentPage.value <= 1 || +currentPage.value > 6) {
      return;
    }
    getInfo(currentPage.value, planets).then(displayPlanet);
  });

  document.getElementById("next").addEventListener("click", () => {
    valuePage = +currentPage.value + 1;
    currentPage.value = `${valuePage}`;
    if (+currentPage.value >= 6 || +currentPage.value < 1) {
      return;
    }
    getInfo(currentPage.value, planets).then(displayPlanet);
  });
}

/*--------------------------Buttons-----------------------------------------------*/

btnInfo.addEventListener("click", () => {
  const peopleId = document.getElementById("filmId").value;
  if (peopleId < 1 || peopleId > 9) return;
  getInfo(peopleId, people).then(displayPeople);
});

btnPlanet.addEventListener("click", () => {
  const planetId = document.getElementById("filmId").value;
  if (planetId < 1 || planetId > 6) return;
  getInfo(planetId, planets).then(displayPlanet);
});

btnFilm.addEventListener("click", () => {
  const filmId = document.getElementById("filmId").value;
  if (filmId < 1 || filmId > 6) return;
  getFilmsPeople(filmId).then(displayFilmCharacters);
});

btnTrans.addEventListener("click", () => {
  const pageId = document.getElementById("filmId").value;
  if (pageId < 2 || pageId === 4 || pageId === 6 || pageId === 7 || pageId > 8)
    return;
  getInfoTranslate(pageId, people).then(displayPeopleTranslate);
});

btnPlanetTrans.addEventListener("click", () => {
  const pageId = document.getElementById("filmId").value;
  if (pageId < 2 || pageId > 5) return;
  getInfoTranslate(pageId, planets).then(displayPlanetsTranslate);
});

paginationInit();
