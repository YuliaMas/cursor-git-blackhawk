const min = 10000;
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

async function getChars(length) {
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
// function getChineseSymbol() {
//   const sign = parseInt(Date.now().toString().substr(-5));
//   console.log(sign);
//   return sign;
// }

// function f(length) {
//   // let signArr = [];
//   setTimeout(() => {
//     // getChineseSymbol();
//     // signArr.push(getChineseSymbol());
//     return getChineseSymbol();
//     // console.log(signArr);
//   }, 50 * length);
//   // return signArr;
// }

// const getCharsCode = async (length) => {
//   let signArr = [];
//   let sign;
//   let res = "";
//   return new Promise(async (resolve, reject) => {
//     if (length <= 0) {
//       reject();
//     }
//     try {
//       let i = 0;
//       while (i < length) {
//         await setTimeout(() => {
//           sign = getChineseSymbol();
//           if (sign < min) {
//             sign = sign + min;
//           }
//           signArr.push(sign);
//           // if (signArr.length === length) {
//           const charCode = String.fromCharCode(sign);
//           res += charCode;
//           console.log(res);
//           console.log(signArr);
//           resolve(signArr, res);
//         }, 50);
//         i++;
//       }
//       resolve(signArr, res);
//     } catch {}
//   });
// };
// getCharsCode(4).then((el1, el2) => console.log(el1, el2));
const delay = () => {
  return new Promise((res) =>
    setTimeout(() => {
      res();
    }, 50)
  );
};

const getRandomChinese = async (length) => {
  const start = Date.now();
  let end;
  let result = [];
  let resNum = [];
  try {
    for (let i = 0; i < length; i++) {
      const uniqueKey = Date.now().toString().substr(-5);
      await delay(uniqueKey);
      end = Date.now();
      resNum.push(uniqueKey);
      result.push(String.fromCharCode(uniqueKey));
    }
  } catch {
    throw new Error("impossible error");
  } finally {
    console.log(
      `${result.join("")}  за ${end - start} ms  ${resNum.join(" , ")}`
    );
    // return result.join('');
  }
};

console.log(getRandomChinese(8));
