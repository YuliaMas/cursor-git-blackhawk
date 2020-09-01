import photoCharacters from "./PhotoChar.js";
import "./img/Biggs_Darklighter.png";
import "./img/luke-skywalker.png";
import "./img/dark_waider.png";
import "./img/r2-d2.png";
import "./img/r5-d4.jpg";
import "./img/c-3po.png";
import "./img/chewbacca.png";
import "./img/greedo.jpg";
import "./img/Jek_Tono_Porkins.png";
import "./img/leila organa.png";
import "./img/Tarkin-SWE.png";
import "./img/Beru_Lars.jfif";
import "./img/Han-Solo.png";
import "./img/jabba-the-hutt-boba-fett-yoda.jpeg";
import "./img/owen-lars.png";
import "./img/RaymusAntilles.jpg";
import "./img/wan-kenobi.png";
import "./img/Wedge_Antilles.png";
import "./img/bossk.png";
import "./img/Character-Lobot.png";
import "./img/ij-88-jabbapng.png";
import "./img/lando-calrissian.jpg";
import "./img/palpatine.png";
import "./img/yoda.png";
import "./img/boba-fett.png";
import "./img/Adi Gallia.png";
import "./img/ArvelCrynyd.png";
import "./img/Ayla-Secura.png";
import "./img/bib_fortuna.png";
import "./img/ackbar.jpg";
import "./img/dooku.png";
import "./img/Eeth_Koth.png";
import "./img/general-grievous.png";
import "./img/Ki-Adi-Mundi.png";
import "./img/Kit_Fisto.jfif";
import "./img/Luminara-Unduli.png";
import "./img/mace-windu.png";
import "./img/Mon_Mothma.png";
import "./img/nien-nunb.png";
import "./img/Nute-Gunray.png";
import "./img/Padmé-Amidala.png";
import "./img/Plo-Koont.png";
import "./img/Pogglethelesser_detail.png";
import "./img/R4-P17-75006.png";
import "./img/Shaakti_detail.png";
import "./img/Sly-Moore.png";
import "./img/tarfful_detail.png";
import "./img/Tion_Medon.webp";
import "./img/Anakin-Skywalker.png";
import "./img/Bail_Organa.png";
import "./img/Barriss-Offee.png";
import "./img/cliegglars_detail.png";
import "./img/Cordé.jpg";
import "./img/dexterjettster_detail.png";
import "./img/Dormé.jpg";
import "./img/Gregar-Typho.png";
import "./img/Jango Fett.png";
import "./img/Jar-Jar-Binks.png";
import "./img/Jocasta-Nu.png";
import "./img/Lama_su.png";
import "./img/Saesee-Tiin.png";
import "./img/San_Hill.png";
import "./img/Shmi-Skywalker.png";
import "./img/Taun-We.png";
import "./img/Wat_Tambor.png";
import "./img/Watto.png";
import "./img/Zam_Wesell.png";
import "./img/Mas_Amedda.png";
import "./img/BenQuadinarosHS-SWE.png";
import "./img/Darth-Maul.png";
import "./img/Dud_Bolt.jpg";
import "./img/Gasganp.jpg";
import "./img/Quarsh-Panaka.jpg";
import "./img/Qui-Gon-Jinn.png";
import "./img/RattsHS.jpg";
import "./img/Ric_Olie.jpg";
import "./img/Roos-Tarpals.png";
import "./img/RugorNass-SWCT.png";
import "./img/Sebulba.png";
import "./img/Valorum-SWE.png";
import "./img/wicket_w_warwick.png";
import "./img/Yarael-Poof.png";

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
    const imageAdd = Object.values(photoCharacters)[i].replace("./img", "img");
    const httpsUrl = characters["url"].replace("http", "https");
    if (httpsUrl === Object.keys(photoCharacters)[i]) {
      image.src = imageAdd;
      personIcon.appendChild(image);
    }
  }
}

export default displayPeople;
