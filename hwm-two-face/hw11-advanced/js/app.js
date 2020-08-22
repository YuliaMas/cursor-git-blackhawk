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
