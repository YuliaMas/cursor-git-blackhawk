const BASE = "https://swapi.dev/api/";

function getPeople(numPage) {
  const request = axios.get(BASE + `people/?page=${numPage}`);
  return request
    .then((res) => {
      console.log(res.data);
      console.log(res.data.results);
      return res.data.results;
    })
    .catch((err) => {
      if (!request) {
        console.log("something wrong", err);
      }
      return [];
    });
}

function getFilmsPeople(filmNumber) {
  const request = axios.get(`${BASE}films/${filmNumber}/`);
  return request
    .then((data) => {
      console.log(data.data["url"].replace("http", "https"));
      let httpsUrl = [];
      for (let i = 0; i < data.data["characters"].length; i++) {
        httpsUrl[i] = data.data["characters"][i].replace("http", "https");
      }
      return httpsUrl;
      // return data.data["characters"];
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
  const request = axios.get(BASE + `people/?page=${numPage}&format=wookiee`);
  return request.then((res) => {
    console.log(res.data.rcwochuanaoc);
    return res.data.rcwochuanaoc;
  });
}

function getPlanets(numPage = 1) {
  const request = axios.get(BASE + `planets/?page=${numPage}`);
  return request
    .then((res) => {
      console.log(res.data.results);
      return res.data.results;
    })
    .catch((err) => {
      console.log("something wrong", err);
    });
}

function getPlanetsTranslate(numPage = 1) {
  const request = axios.get(BASE + `planets/?page=${numPage}&format=wookiee`);
  return request
    .then((res) => {
      console.log(res.data.rcwochuanaoc);
      return res.data.rcwochuanaoc;
    })
    .catch((err) => {
      console.log("something wrong", err);
    });
}
