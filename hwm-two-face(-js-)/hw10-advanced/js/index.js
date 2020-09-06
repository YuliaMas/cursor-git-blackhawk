window.addEventListener("DOMContentLoaded", () => {
  const getBell = document.getElementById("door-bell");
  const getKnock = document.getElementById("knock");
  const getCar = document.getElementById("car");
  const getBird = document.getElementById("bird");
  const getWashDishes = document.getElementById("washDish");
  const getLamp = document.getElementById("light");
  const bellSound = document.getElementById("bellSound");
  const knockSound = document.getElementById("knockSound");
  const carSound = document.getElementById("carSound");
  const washDishesSound = document.getElementById("washDishesSound");
  const birdSound = document.getElementById("birdSound");
  const lightLampSound = document.getElementById("lightLampSound");
  const audio = [ bellSound, carSound , knockSound, washDishesSound,birdSound ,lightLampSound];

  function stopSound() {
  audio.map((elems) => {
    // elems.paused = true;
    // elems.currentTime = 0;
    elems.muted = true;
  })
  }

  const setSound = (elem, elemId) => {
    if (elem.paused === true) {
      elem.currentTime = 0;
      document.getElementById(elemId).play();
      elem.muted = false;
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
    stopSound();
    const bellSound = document.getElementById("bellSound");
    setSound(bellSound, "bellSound");
  });

  getKnock.addEventListener("click", () => {
    stopSound();
    const knockSound = document.getElementById("knockSound");
    setSound(knockSound, "knockSound");
  });

  getCar.addEventListener("click", () => {
    stopSound();
    const carSound = document.getElementById("carSound");
    setSound(carSound, "carSound");
  });

  getBird.addEventListener("click", () => {
    stopSound();
    const birdSound = document.getElementById("birdSound");
    setSound(birdSound, "birdSound");
  });

  getWashDishes.addEventListener("click", () => {
    stopSound();
    const washDishesSound = document.getElementById("washDishesSound");
    setSound(washDishesSound, "washDishesSound");
  });

  getLamp.addEventListener("click", () => {
    stopSound();
    const lightLampSound = document.getElementById("lightLampSound");
    setSound(lightLampSound, "lightLampSound");
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "KeyB") {
      stopSound();
      const bellSound = document.getElementById("bellSound");
      setSound(bellSound, "bellSound");
      setColorBell(getBell);
    }
    if (event.code === "KeyK") {
      stopSound();
      const knockSound = document.getElementById("knockSound");
      setSound(knockSound, "knockSound");
      setColorButton(getKnock);
    }
    if (event.code === "KeyC") {
      stopSound();
      const carSound = document.getElementById("carSound");
      setSound(carSound, "carSound");
      setLastColor(getCar);
    }
    if (event.code === "KeyD") {
      stopSound();
      const birdSound = document.getElementById("birdSound");
      setSound(birdSound, "birdSound");
      setColorButton(getBird);
    }
    if (event.code === "KeyW") {
      stopSound();
      const washDishesSound = document.getElementById("washDishesSound");
      setSound(washDishesSound, "washDishesSound");
      setColorButton(getWashDishes);
    }
    if (event.code === "KeyL") {
      stopSound();
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
  })
})
