function displayPeople(people = []) {
  const container = document.querySelector(".people");
  container.innerHTML = "";

  people.map((person) => {
    const personElement = document.createElement("div");
    const personIcon = document.createElement("div");
    personElement.className = "person around";
    personElement.innerHTML = `
    <div>
      <h3> <span> Name:</span> ${person.name}</h3>
      <h4> <span> Birthday:</span> ${person["birth_year"]}</h4>
      <h4> <span> Gender:</span> ${person["gender"]}</h4>
     </div>
    `;
    personIcon.className = "icon";
    container.append(personElement);
    personElement.appendChild(personIcon);
    findImg(person, personIcon);
  });
}

function display(characters = {}) {
  const container = document.querySelector(".people");
  container.innerHTML = "";

  characters.map((char) => {
    axios.get(char).then((char) => {
      console.log(char.data);
      characters = char.data;

      const personElement = document.createElement("div");
      const personIcon = document.createElement("div");
      personElement.className = "person around";
      personElement.innerHTML = `
      <div>
        <h3> <span> Name: </span> ${characters.name}</h3>
        <h4> <span> Birthday: </span> ${characters["birth_year"]}</h4>
        <h4> <span> Gender: </span> ${characters["gender"]}</h4>
      </div>
    `;
      personIcon.className = "icon";
      container.append(personElement);
      personElement.appendChild(personIcon);
      findImg(characters, personIcon);
    });
  });
}

function displayPlanet(planets = []) {
  const container = document.querySelector(".people");
  container.innerHTML = "";

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
  const container = document.querySelector(".people");
  container.innerHTML = "";

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
  const container = document.querySelector(".people");
  container.innerHTML = "";

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

function paginationInit() {
  let valuePage = 1;
  let currentPage = document.getElementById("filmId");
  document.getElementById("prev").addEventListener("click", () => {
    if (+currentPage.value <= 1) return;
    valuePage = +currentPage.value - 1;
    currentPage.value = `${valuePage}`;
    getPlanets(currentPage.value).then(displayPlanet);
  });
  document.getElementById("next").addEventListener("click", () => {
    if (+currentPage.value >= 6) return;
    valuePage = +currentPage.value + 1;
    currentPage.value = `${valuePage}`;
    getPlanets(currentPage.value).then(displayPlanet);
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
  for (let i = 0; i < Object.keys(translatePhoto).length; i++) {
    if (person["hurcan"] === Object.keys(translatePhoto)[i]) {
      image.src = Object.values(translatePhoto)[i];
      personIcon.appendChild(image);
    }
  }
}

const btnInfo = document.getElementById("btn");
const btnFilm = document.getElementById("btnFilm");
const btnPlanet = document.getElementById("btnPlanet");
const btnTrans = document.getElementById("btnTrans");
const btnPlanetTrans = document.getElementById("btnPlanetTrans");
const info = document.querySelector(".container");

btnInfo.addEventListener("click", () => {
  const peopleId = document.getElementById("filmId").value;
  getPeople(peopleId).then(displayPeople);
});

btnPlanet.addEventListener("click", () => {
  const planetId = document.getElementById("filmId").value;
  getPlanets(planetId).then(displayPlanet);
});

btnFilm.addEventListener("click", () => {
  const filmId = document.getElementById("filmId").value;
  getFilmsPeople(filmId).then(display);
});

btnTrans.addEventListener("click", () => {
  const pageId = document.getElementById("filmId").value;
  getPeopleTranslate(pageId).then(displayPeopleTranslate);
});

btnPlanetTrans.addEventListener("click", () => {
  const pageId = document.getElementById("filmId").value;
  getPlanetsTranslate(pageId).then(displayPlanetsTranslate);
});
paginationInit();
