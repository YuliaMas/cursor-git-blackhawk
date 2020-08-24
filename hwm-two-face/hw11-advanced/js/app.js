const setResult = async () => {
  const length = document.getElementById("length").value;
  try {
    const chars = await getChars(+length);
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

const numberBtn = document.getElementById("btn");
numberBtn.addEventListener("click", setResult);
