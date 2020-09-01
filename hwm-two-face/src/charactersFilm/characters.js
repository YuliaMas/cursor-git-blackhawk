import axios from "axios";

const BASE = "https://swapi.dev/api/";

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

export default { getInfo };
