const card = new Card("js-card");
card.run();
function Card(classCard) {
  this.cards = document.querySelectorAll("." + classCard);
  this.bindEventsCard = function () {
    for (let i = 0, length = this.cards.length; i < length; i++) {
      this.cards[i].addEventListener("mousemove", this.startRotate);
      this.cards[i].addEventListener("mouseout", this.stopRotate);
    }
  };
  this.startRotate = function (event) {
    const cardItem = this.querySelector(".card"),
      halfHeight = cardItem.offsetHeight / 2,
      halfWidth = cardItem.offsetWidth / 2;
    cardItem.style.transform =
      "rotateX(" +
      -(event.offsetY - halfHeight) / 5 +
      "deg) rotateY(" +
      (event.offsetX - halfWidth) / 5 +
      "deg)";
  };
  this.stopRotate = function (event) {
    const cardItem = this.querySelector(".card");
    cardItem.style.transform = "rotate(0)";
  };
  this.run = () => {
    this.bindEventsCard();
  };
}
