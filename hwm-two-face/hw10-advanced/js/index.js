window.addEventListener("DOMContentLoaded", () => {
  const getBell = document.getElementById("door-bell");
  const getKnock = document.getElementById("knock");
  const getCar = document.getElementById("car");
  const getBird = document.getElementById("bird");
  const getWashDishes = document.getElementById("washDish");
  const getLamp = document.getElementById("light");

  const setSound = (elem, elemId) => {
    document.getElementById(elemId).play();
  };
  const setColorBell = (elemId) => {
    elemId.style.backgroundColor = "pink";
  };
  const colorBellDefault = (elemId) => {
    elemId.style.backgroundColor = "#d0d0d0";
  };
  const colorCarDefault = (elemId) => {
    elemId.style.backgroundColor = "#968d877a";
  };
  const setColorButton = (elemId) => {
    elemId.style.backgroundColor = "#8b1313";
  };
  const setLastColor = (elemId) => {
    elemId.style.backgroundColor = "saddlebrown";
  };
  const setLightLamp = (elemId) => {
    elemId.style.backgroundColor = "#f8ed13";
    elemId.style["boxShadow"] = "10px 10px 142px 37px rgba(237,237,14,1)";
    elemId.style.color = "#f8ed13";
  };
  const setLampDefault = (elemId) => {
    elemId.style["boxShadow"] = "0 0 0 0";
    elemId.style.color = "white";
  };

  /*---------------------------------------Buttons------------------------------------*/
  getBell.addEventListener("click", () => {
    const bellSound = document.getElementById("bellSound");
    setSound(bellSound, "bellSound");
  });

  getKnock.addEventListener("click", () => {
    const knockSound = document.getElementById("knockSound");
    setSound(knockSound, "knockSound");
  });

  getCar.addEventListener("click", () => {
    const carSound = document.getElementById("carSound");
    setSound(carSound, "carSound");
  });

  getBird.addEventListener("click", () => {
    const birdSound = document.getElementById("birdSound");
    setSound(birdSound, "birdSound");
  });

  getWashDishes.addEventListener("click", () => {
    const washDishesSound = document.getElementById("washDishesSound");
    setSound(washDishesSound, "washDishesSound");
  });

  getLamp.addEventListener("click", () => {
    const lightLampSound = document.getElementById("lightLampSound");
    setSound(lightLampSound, "lightLampSound");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "d") {
      const bellSound = document.getElementById("bellSound");
      setSound(bellSound, "bellSound");
      setColorBell(getBell);
    }
    if (event.key === "k") {
      const knockSound = document.getElementById("knockSound");
      setSound(knockSound, "knockSound");
      setColorButton(getKnock);
    }
    if (event.key === "c") {
      const carSound = document.getElementById("carSound");
      setSound(carSound, "carSound");
      setLastColor(getCar);
    }
    if (event.key === "b") {
      const birdSound = document.getElementById("birdSound");
      setSound(birdSound, "birdSound");
      setColorButton(getBird);
    }
    if (event.key === "w") {
      const washDishesSound = document.getElementById("washDishesSound");
      setSound(washDishesSound, "washDishesSound");
      setColorButton(getWashDishes);
    }
    if (event.key === "l") {
      const lightLampSound = document.getElementById("lightLampSound");
      setSound(lightLampSound, "lightLampSound");
      setLightLamp(getLamp);
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "k") {
      setLastColor(getKnock);
    }
    if (event.key === "b") {
      setLastColor(getBird);
    }
    if (event.key === "w") {
      setLastColor(getWashDishes);
    }
    if (event.key === "d") {
      colorBellDefault(getBell);
    }
    if (event.key === "c") {
      colorCarDefault(getCar);
    }
    if (event.key === "l") {
      setLastColor(getLamp);
      setLampDefault(getLamp);
    }
  });
});
