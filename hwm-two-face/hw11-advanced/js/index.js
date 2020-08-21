const min = 10000;
let data;
let result = "";
let signUp = "";

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

function setResult() {
  const len = document.getElementById("length").value;
  doPromise(+len)
    .then(() => {
      const list = document.getElementById("list");
      const text = document.getElementById("text");
      const time = document.getElementById("time");
      list.innerHTML = `Translate:  ${signUp}`;
      text.innerHTML = `Result: ${result}`;
      time.innerHTML = `Runtime: ${data}ms`;
    })
    .catch(() => {
      text.innerHTML = "The number is smaller";
    });
}

const numberBtn = document.getElementById("btn");
numberBtn.addEventListener("click", setResult);
