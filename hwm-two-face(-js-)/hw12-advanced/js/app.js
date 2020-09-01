const btnInfo = document.getElementById("btn");
const btnFilm = document.getElementById("btnFilm");
const btnPlanet = document.getElementById("btnPlanet");
const btnTrans = document.getElementById("btnTrans");
const btnPlanetTrans = document.getElementById("btnPlanetTrans");
const container = document.querySelector(".people");
const title = document.querySelector(".title");

function createInfoCharWookiee(element, person) {
  element.innerHTML = `
    <div>
      <h3> <span> Whrascwo: </span> ${person.whrascwo}</h3>
      <h4> <span> Rhahrcaoac_roworarc: </span> ${person["rhahrcaoac_roworarc"]}</h4>
      <h4> <span> Rrwowhwaworc: </span> ${person["rrwowhwaworc"]}</h4>
    </div>
    `;
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

function createInfoPlanet(element, planet) {
  element.innerHTML = `
    <div>
      <h3> <span> Name: </span> ${planet.name}</h3>
      <h4> <span> Climate: </span> ${planet["climate"]}</h4>
      <h4> <span> Terrain: </span> ${planet["terrain"]}</h4>
      <h4> <span> Population: </span> ${planet["population"]}</h4>
     </div>
    `;
}

function createInfoPlanetWookiee(element, planet) {
  element.innerHTML = `
    <div>
      <h3> <span> Whrascwo: </span> ${planet.whrascwo}</h3>
      <h4> <span> Oaanahscraaowo: </span> ${planet["oaanahscraaowo"]}</h4>
      <h4> <span> Aoworcrcraahwh: </span> ${planet["aoworcrcraahwh"]}</h4>
      <h4> <span> Akooakhuanraaoahoowh: </span> ${planet["akooakhuanraaoahoowh"]}</h4>
    </div> 
    `;
}

function displayCharacterInfo(person, wookiee) {
  const personElement = document.createElement("div");
  personElement.className = "person around";
  const personIcon = document.createElement("div");
  personIcon.className = "icon";
  switch (person.gender || person["rrwowhwaworc"]) {
    case "male":
      person.gender += `  ♂`;
      break;
    case "female":
      person.gender += `  ♀`;
      break;
    case "scraanwo":
      person["rrwowhwaworc"] += `  ♂`;
      break;
    case "wwwoscraanwo":
      person["rrwowhwaworc"] += `  ♀`;
      break;
  }
  if (wookiee) {
    createInfoCharWookiee(personElement, person);
    findImg(person, personIcon, 1);
  } else {
    createInfoChar(personElement, person);
    findImg(person, personIcon, 0);
  }
  container.append(personElement);
  personElement.appendChild(personIcon);
}

function displayPlanetInfo(planet, wookiee) {
  const personElement = document.createElement("div");
  personElement.className = "person";
  if (wookiee) {
    createInfoPlanetWookiee(personElement, planet);
  } else {
    createInfoPlanet(personElement, planet);
  }
  container.append(personElement);
}

function displayPeople(people = []) {
  container.innerHTML = "";
  title.innerText = "Characters";
  people.map((person) => {
    displayCharacterInfo(person, 0);
  });
}

function displayFilmCharacters(characters = {}) {
  container.innerHTML = "";
  title.innerText = "Characters";
  characters.map((char) => {
    axios.get(char).then((char) => {
      characters = char.data;
      displayCharacterInfo(characters, 0);
    });
  });
}

function displayPeopleTranslate(people = []) {
  container.innerHTML = "";
  title.innerText = "Characters";
  people.map((person) => {
    displayCharacterInfo(person, 1);
  });
}

function displayPlanet(planets = []) {
  container.innerHTML = "";
  title.innerText = "Planets";
  planets.map((planet) => {
    displayPlanetInfo(planet, 0);
  });
}

function displayPlanetsTranslate(planets = []) {
  container.innerHTML = "";
  title.innerText = "Planets";
  planets.map((planet) => {
    displayPlanetInfo(planet, 1);
  });
}

function findImg(characters, personIcon, translate) {
  const image = document.createElement("img");
  image.className = "iconCharacter";
  if (!translate) {
    for (let i = 0; i < Object.keys(photoCharacters).length; i++) {
      const httpsUrl = characters["url"].replace("http", "https");
      if (httpsUrl === Object.keys(photoCharacters)[i]) {
        image.src = Object.values(photoCharacters)[i];
        personIcon.appendChild(image);
      }
    }
  } else {
    for (let key in wookieePhoto) {
      if (characters["hurcan"] === key) {
        image.src = wookieePhoto[key];
        personIcon.appendChild(image);
      }
    }
  }
}

function paginationInit() {
  let valuePage = 0;
  let currentPage = document.getElementById("filmId");

  document.getElementById("prev").addEventListener("click", () => {
    valuePage = +currentPage.value - 1;
    currentPage.value = `${valuePage}`;
    if (+currentPage.value < 1 || +currentPage.value > 6) {
      title.innerHTML = "";
      container.innerHTML = "";
      return;
    }
    getInfo(currentPage.value, planets).then(displayPlanet);
  });

  document.getElementById("next").addEventListener("click", () => {
    valuePage = +currentPage.value + 1;
    currentPage.value = `${valuePage}`;
    if (+currentPage.value > 6 || +currentPage.value < 1) {
      title.innerHTML = "";
      container.innerHTML = "";
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
