// let characters;
// let infoCharacters;
// function getUser(reject) {
//   const request = axios.get("https://swapi.dev/api/films/2/");
//   console.log(request);
//   request
//     .then((data) => {
//       characters = data.data["characters"];
//       console.log("res:", data.data["characters"]);
//       let character = characters.map((char, i) =>
//         axios.get(char).then((data) => {
//           console.log(data.data);
//           // infoCharacters = JSON.parse(
//           //   JSON.stringify(
//           //     `name:  ${data.data.name}; birthday: ${data.data["birth_year"]}; gender:  ${data.data["gender"]}`
//           //   )
//           // );
//           // console.log(`res[${i}]: ${infoCharacters}`);
//           i++;
//           // info.innerHTML = `res[${i}]: ${infoCharacters}`;
//           // return `${infoCharacters}`;
//         })
//       );
//       console.log(character);
//       // console.log(infoCharacters);
//       // return infoCharacters;
//       // return characters;
//     })
//     .catch(() => {
//       if (!request) {
//         console.log("err");
//       }
//     });
// }
// getUser();
// // const BASE = "https://swapi.dev/api/";
// let requestUsers = axios.get(BASE + "");
// function componentWillMount() {
//   this.fetchData("https://swapi.dev/api/").then((res) => {
//     this.fetchData(res["people"]).then((people) =>
//       console.log(JSON.stringify(people))
//     );
//     // this.fetchData(res["films"]).then((films) =>
//     //   console.log(JSON.stringify(films))
//     // );
//   });
// }
//
// async function fetchData(url) {
//   const response = await fetch(url);
//   return response.json();
// }
// // componentWillMount();
// const config = {
//   method: "GET",
//   url: BASE + "people",
//   params: {
//     page: numPage,
//   },

const BASE = "https://swapi.dev/api/";

function getPeople(numPage) {
  const request = axios.get(BASE + `people?page=${numPage}`);
  return request
    .then((res) => {
      // console.log(res.data);
      // const httpsUrl = res.data.next.replace("http", "https");
      console.log(res.data.results);
      return res.data.results;
    })
    .catch((err) => {
      console.log("something wrong", err);
      // return [];
    });
}

function getFilmsPeople(filmNumber) {
  const request = axios.get(`${BASE}films/${filmNumber}`);
  return request
    .then((data) => {
      // return data.data["characters"];
      // characters = data.data["characters"];
      console.log("res:", data.data);
      console.log(data.data["url"]);
      return data.data["characters"];

      // characters.map((char, i) =>
      //      axios.get(char).then((data) => {
      //        console.log(data.data);
      // })
      // );
    })
    .catch((err) => {
      console.log("something wrong", err);
    });
}
const request = axios.get("https://swapi.dev/api/films/2/?format=wookiee");
console.log(request);

function getPeopleTranslate(numPage) {
  const request = axios.get(BASE + `people?page=${numPage}&format=wookiee`);
  return request.then((res) => {
    console.log(res.data.rcwochuanaoc);
    return res.data.rcwochuanaoc;
    // oaoohuwhao: 82;
    // rcwochuanaoc: Array(10);
  });
}

function getPlanets(numPage) {
  const request = axios.get(BASE + `planets?page=${numPage}`);
  return request
    .then((res) => {
      console.log(res.data.results);
      return res.data.results;
    })
    .catch((err) => {
      console.log("something wrong", err);
    });
}

// axios
//   .get("https://swapi.dev/api/people/")
//   .then((result) => {
//     console.log(result);
//     return result.nextPage();
//   })
//   .then((result) => {
//     console.log(result);
//     return result.previousPage();
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
