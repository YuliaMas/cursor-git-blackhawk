window.addEventListener("DOMContentLoaded", () => {
  const getBell = document.getElementById("door-bell");
  const getKnock = document.getElementById("knock");
  const getCar = document.getElementById("car");
  const getBird = document.getElementById("bird");
  const getWashDishes = document.getElementById("washDish");
  const getLamp = document.getElementById("light");

  const setSound = (elem, elemId) => {
    // document.getElementById(elemId).play();
    if (elem.paused === true) {
      elem.currentTime = 0;
      document.getElementById(elemId).play();
    } else if (elem.paused === false) {
      document.getElementById(elemId).pause();
    }
  };

  /*---------------------------------Colors style-----------------------------------*/
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
    if (event.code === "KeyB") {
      const bellSound = document.getElementById("bellSound");
      setSound(bellSound, "bellSound");
      setColorBell(getBell);
    }
    if (event.code === "KeyK") {
      const knockSound = document.getElementById("knockSound");
      setSound(knockSound, "knockSound");
      setColorButton(getKnock);
    }
    if (event.code === "KeyC") {
      const carSound = document.getElementById("carSound");
      setSound(carSound, "carSound");
      setLastColor(getCar);
    }
    if (event.code === "KeyD") {
      const birdSound = document.getElementById("birdSound");
      setSound(birdSound, "birdSound");
      setColorButton(getBird);
    }
    if (event.code === "KeyW") {
      const washDishesSound = document.getElementById("washDishesSound");
      setSound(washDishesSound, "washDishesSound");
      setColorButton(getWashDishes);
    }
    if (event.code === "KeyL") {
      const lightLampSound = document.getElementById("lightLampSound");
      setSound(lightLampSound, "lightLampSound");
      setLightLamp(getLamp);
    }
  });

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "KeyK":
        setLastColor(getKnock);
        break;
      case "KeyD":
        setLastColor(getBird);
        break;
      case "KeyW":
        setLastColor(getWashDishes);
        break;
      case "KeyB":
        colorBellDefault(getBell);
        break;
      case "KeyC":
        colorCarDefault(getCar);
        break;
      case "KeyL":
        setLastColor(getLamp);
        setLampDefault(getLamp);
        break;
    }
  });
});
