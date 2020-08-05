window.addEventListener("DOMContentLoaded", () => {
  let timerId;
  function task4(nameCountry, field, name) {
    const sal = document.querySelector(`.${field}`);
    timerId = setTimeout(
      function run(country) {
        let data = getMySalary.call(country);
        console.log(`Дані по рандомній зарплаті ${name} :`, data);
        for (const [key, value] of Object.entries(data)) {
          sal.textContent += `${key}: ${value}  \n `;
        }
        timerId = setTimeout(run, 1000, country);
      },
      1000,
      nameCountry
    );
  }
  function stopTimeout() {
    clearTimeout(timerId);
  }

  /*--------------------------------------Buttons--------------------------------------*/
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("click-1")) {
      `${task4(ukraine, "resA", "Ukraine")}`;
    }
  });
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("click-2")) {
      `${task4(latvia, "resB", "Латвії")}`;
    }
  });
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("click-3")) {
      `${task4(litva, "resC", "Литви")}`;
    }
  });
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("click-4")) {
      `${stopTimeout()}`;
    }
  });
});
