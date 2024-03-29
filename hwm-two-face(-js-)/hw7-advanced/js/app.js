window.addEventListener("DOMContentLoaded", () => {
  function task1(country, str) {
    const getSalary = document.querySelector("#salary").value;
    const getTaxes = document.querySelector(".card1");
    getTaxes.innerHTML += `
				<p class="card-3">
					<span>${str} :</span>	<span>${getMyTaxes.call(country, getSalary)} </span>
				</p>`;
  }
  function task2(country, str) {
    const getMidTaxes = document.querySelector(".card2");
    getMidTaxes.innerHTML += `
    	<p class="card-3"> 
    		<span>${str} :</span>	<span> ${getMiddleTaxes.call(country)}</span>	
    	</p>`;
  }
  function task3(country, str) {
    const getTaxesTotal = document.querySelector(".card3");
    getTaxesTotal.innerHTML += ` 
 				<p class="card-3"> 
					<span>${str} :</span> <span>${getTotalTaxes.call(country)}</span>
				</p>`;
  }

  function task4(nameCountry, field, name) {
    const getSalary = document.querySelector(`.${field}`);
    timerId = setTimeout(
      function run(country) {
        let countryObj = getMySalary.call(country);
        console.log(`Дані по рандомній зарплаті ${name} :`, countryObj);
        for (const [key, value] of Object.entries(countryObj)) {
          getSalary.innerHTML += `${key}:  ${value}   ||  `;
        }
        getSalary.innerHTML += `<br/>`;
        timerId = setTimeout(run, 10000, country);
      },
      1000,
      nameCountry
    );
  }

  /*--------------------------------------Buttons--------------------------------------*/
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("click-5")) {
      for (let i = 0; i < countryName.length; i++) {
        `${task1(countryName[i], name[i])}`;
      }
    }
  });
  document.getElementById("click6").addEventListener(
    "click",
    (event) => {
      if (event.target.classList.contains("click-6")) {
        let i = 0;
        for (const country of countryName) {
          `${task2(country, name[i])}`;
          i++;
        }
      }
    },
    { once: true }
  );
  document.getElementById("click7").addEventListener(
    "click",
    (event) => {
      if (event.target.classList.contains("click-7")) {
        let i = 0;
        for (const country of countryName) {
          `${task3(country, name[i])}`;
          i++;
        }
      }
    },
    { once: true }
  );
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
