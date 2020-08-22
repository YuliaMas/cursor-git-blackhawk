const min = 10000;
let data;
let result = "";
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

async function doPromise(length) {
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
        result = res;
        resolve();
      }
    }, 50);
  });
}
