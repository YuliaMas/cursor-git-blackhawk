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
