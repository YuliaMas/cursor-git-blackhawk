import "./chain.css";
let data;
let signUp = "";

const phrase = [
  "Before I finish - 在我结束",
  "We'd better stop now - 我们最好别看",
  "I have attempted to explain here that... - 我试图在这里解释一下...",
  "That remains to be seen - 这还有待",
  "We agreed that... - ...我们同意",
  "It makes sense that... - ...是有通理的",
  "You are not alone - 你不是孤单一个人",
];

function random(array) {
  return array[Math.floor(Math.random() * array.length) | 0];
}

function getChars(length) {
  const min = 10000;
  let res = "";
  let signArr = [];
  const start = Date.now();
  return new Promise((resolve, reject) => {
    if (length <= 0) {
      reject();
    }
    let count = 0;
    const timerId = setInterval(() => {
      count++;
      let sign = parseInt(Date.now().toString().substr(-5));
      if (sign < min) {
        sign = sign + min;
      }
      signArr.push(sign);
      const charCode = String.fromCharCode(sign);
      res += charCode;
      if (count === length) {
        clearInterval(timerId);
        const end = Date.now();
        data = end - start;
        signUp = signArr.join(" - ");
        resolve(res);
      }
    }, 50);
  });
}

export default function () {
  const setResult = async () => {
    const getLength = document.getElementById("length").value;
    try {
      const chars = await getChars(+getLength);
      const list = document.getElementById("list");
      const text = document.getElementById("text");
      const time = document.getElementById("time");
      const randomPhrase = document.getElementById("phraseRandom");
      list.innerHTML = `Translate:  ${signUp}`;
      text.innerHTML = `Result: ${chars}`;
      time.innerHTML = `Runtime: ${data}ms`;
      randomPhrase.innerHTML = `Phrase of the day: <span> ${random(
        phrase
      )} </span>`;
    } catch {
      text.innerHTML = "The number is smaller";
    }
  };

  const numberBtn = document.getElementById("btnChain");
  numberBtn.addEventListener("click", setResult);
}
