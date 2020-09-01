const BASE = "https://swapi.dev/api/";
const people = `people/?page=`;
const planets = `planets/?page=`;

function getInfo(numPage, info) {
  const request = axios.get(BASE + info + numPage);
  return request
    .then((res) => {
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
      let httpsUrl = [];
      for (let i = 0; i < data.data["characters"].length; i++) {
        httpsUrl[i] = data.data["characters"][i].replace("http", "https");
      }
      return httpsUrl;
    })
    .catch((err) => {
      console.log("something wrong", err);
    });
}

function getInfoTranslate(numPage = 1, info) {
  const request = axios.get(BASE + info + `${numPage}&format=wookiee`);
  return request
    .then((res) => {
      return res.data.rcwochuanaoc;
    })
    .catch((err) => {
      console.log("something wrong", err);
    });
}
