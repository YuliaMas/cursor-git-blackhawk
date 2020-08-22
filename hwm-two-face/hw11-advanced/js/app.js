function setResult() {
  const len = document.getElementById("length").value;
  doPromise(+len)
    .then(() => {
      const list = document.getElementById("list");
      const text = document.getElementById("text");
      const time = document.getElementById("time");
      const randomPhrase = document.getElementById("phraseRandom");
      list.innerHTML = `Translate:  ${signUp}`;
      text.innerHTML = `Result: ${result}`;
      time.innerHTML = `Runtime: ${data}ms`;
      randomPhrase.innerHTML = `Phrase of the day: <span> ${random(
        phrase
      )} </span>`;
    })
    .catch(() => {
      text.innerHTML = "The number is smaller";
    });
}

const numberBtn = document.getElementById("btn");
numberBtn.addEventListener("click", setResult);
