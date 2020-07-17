const anchors = document.querySelectorAll('[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    const blockID = anchor.getAttribute("href");
    document.querySelector("" + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
let t;
function up() {
  let top = Math.max(
    document.body.scrollTop,
    document.documentElement.scrollTop
  );
  if (top > 0) {
    window.scrollBy(0, -200);
    t = setTimeout("up()", 60);
  } else clearTimeout(t);
  return false;
}

(function () {
  let hamburger = {
    nav: document.querySelector("#nav"),
    navToggle: document.querySelector(".nav-toggle"),

    initialize() {
      this.navToggle.addEventListener("click", () => {
        this.toggle();
      });
    },

    toggle() {
      this.navToggle.classList.toggle("expanded");
      this.nav.classList.toggle("expanded");
    },
  };

  hamburger.initialize();
})();

// random img
// sha = function () {
//   return Math.floor(Math.random() * 2);
// };
// sha = function getImage(myImg) {
//   const random = Math.floor(Math.random() * 2);
//   console.log(random);
//   return '<img src="img/' + random + '.png" border="0" />';
// };
//
// document.getElementById("im1").innerHTML = myImg;
// console.log(myImg);

// let arr = [];
// let name = "im";
// function nameId() {
//   for (let i = 1; i < 9; i++) {
//     name = name + i;
//     const arrName = arr.push(name);
//     console.log(arrName);
//     return arrName;
//   }
// }
// console.log(arr);
// nameId();

// add id for array
let arr = [];
function nameId(n) {
  for (let i = 1; i < n; i++) {
    let idName = "im" + i;
    //console.log(idName);
    arr.push(idName);
    //console.log(arr);
  }
  return arr;
}
nameId(15);
// console.log(arr);

// choose one element (id) from array
function randomF() {
  // for (let i = 0; i < arr.length; i++) {
  let idNameRandom = Math.floor(Math.random() * arr.length);
  let array = arr[idNameRandom];
  let elem = document.getElementById(array);
  //console.log(array);
  //console.log(elem);
  return elem;
  // }
}

function prevSize(image) {
  // image.style.width = " calc(15vw - 4px) ";
  // image.style.height = " calc(15vh - 4px ) ";
  image.style.zoom = "1";
  image.onmouseout = function () {
    this.zoom = "1";
  };
  image.style.transition = "0.3s ease-to-in";

  setTimeout(changeSize, 1000);
}

function changeSize() {
  let image = randomF();
  // image.style.width = "calc(20vw - 5px)";
  // image.style.height = "calc(20vh - 3px)";
  image.style.zoom = "1.2";
  image.onmouseover = function () {
    this.zoom = "1.2";
  };
  image.style.transition = "0.3s ease-to-in";

  setTimeout(prevSize, 1000, image);
}
changeSize();

//
// function myFunction() {
//   var element = document.getElementById("myDIV");
//   element.classList.add("mystyle");
// }
//
// function myFunction() {
//   var element = document.getElementById("myDIV");
//   element.classList.remove("mystyle");
// }
//

// $("form").submit(function () {
//   return (
//     $.ajax({
//       type: "POST",
//       url: "mail.php",
//       data: $(this).serialize(),
//     }).done(function () {
//       // $(this).find("input").val(""), window.location.href = "thanks.html", $("form").trigger("reset")
//     }),
//     !1
//   );
// });
