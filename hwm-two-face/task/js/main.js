//  1.	Змінна n зберігає ціле число від 0 до 9. Використовуючи оператор switch, написати скрипт, який в
// залежності від числа буде виводити слово (Наприклад, якщо n дорівнює 3, то буде виводитися слово «три»)
const n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// for (let i = 0; i < n.length; i++) {
// const randomNumber = Math.floor(Math.random() * n[i]);
let number = "";
const getNumber = () => {
  number = prompt("Введіть ваше число від 0 до 9", "");
  return number;
};
getNumber();
// switch (randomNumber) {
switch (number) {
  case "0":
    alert("0 - zero");
    break;
  case "1":
    alert("1 - one");
    break;
  case "2":
    alert("2 - two");
    break;
  case "3":
    alert("3 - three");
    break;
  case "4":
    alert("4 - four");
    break;
  case "5":
    alert("5 - five");
    break;
  case "6":
    alert("6 - six");
    break;
  case "7":
    alert("7 - seven");
    break;
  case "8":
    alert("8 - eight");
    break;
  case "9":
    alert("9 - nine");
    break;
  default:
    alert(" Це не число! ");
    getNumber();
    break;
}
// }

//2.	Використовуючи document.write () і будь-яку з циклічних конструкцій виведіть десять
// однакових зображень (треба виводити <img src = "..." alt = "..." />)
// for (let i = 0; i <= 10; i++) {
//   let img = document.createElement("img");
//   document.write(img);
// }

const container = document.createDocumentFragment();
for (let i = 1; i <= 12; i++) {
  const img = document.createElement("img");
  container.appendChild(img);
  // img.style.width = "300";
  img.src = "img/berry.png";
  img.alt = "berries";
}
document.body.appendChild(container);
document.write("<br />");

// 5.Скоротіть код використовуючи цикли:
// <Script type = 'text / javascript'>
// document.write ( 'Число: <b> 100 </ b>');
// document.write ( '<br />');
// document.write ( 'Число: <b> 80 </ b>');
// document.write ( '<br />');
// document.write ( 'Число: <b> 60 </ b>');
// document.write ( '<br />');
// document.write ( 'Число: <b> 50 </ b>');
// document.write ( '<br />');
// document.write ( 'Число: <b> 40 </ b>');
// document.write ( '<br />');
// document.write ( 'Число: <b> 20 </ b>');
// document.write ( '<br />');
// document.write ( 'Число: <b> 10 </ b>');
// document.write ( '<br />');
// document.write ( 'Число: <b> 0 </ b>');
// </ Script>

for (let i = 100; i >= 0; i = i - 20) {
  document.write(`Число: <b> ${i} </b> <br />`);
  switch (i) {
    case 60:
    case 50:
    case 20:
    case 10:
      i = i + 10;
      break;
  }
  // if (i === 60 || i === 50 || i === 20 || i === 10) {
  //   i = i + 10;
  // }
}

// const arr = [100, 80, 60, 50, 40, 20, 10, 0];
// for (let i = 0; i <= arr.length - 1; i++) {
//   document.write(`Число: <b> ${arr[i]} </b>`);
//   document.write("<br />");
// }

// 3.	Сформувати для учня список складається з n елементів, кожен елемент якого - це оцінка від 2 до 5.
const arrayPupil = [];
arrayPupil.push(2, 4, 5, 3, 4, 4, 5, 2, 4, 3, 5, 5, 5);
const mark = arrayPupil.join(" , ");
alert(` Оцінки учня : ${mark}`);

// 4.	Підрахувати середнє арифметичне і відповідно до цього дати визначення учневі: відмінник, хорошист,
// трієчник, двієчник.
const num = arrayPupil.length;

let sumElem = 0;
for (let i = 0; i < arrayPupil.length; i++) {
  sumElem += arrayPupil[i];
}
alert(`Сума всіх оцінок: ${sumElem}`);

const rating = sumElem / num;
const ratingRound = Math.round(rating);
switch (ratingRound) {
  case 5:
    arrayPupil.push("відмінник");
    alert("відмінник");
    break;
  case 4:
    arrayPupil.push("хорошист");
    alert("хорошист");
    break;
  case 3:
    arrayPupil.push("трієчник");
    alert("трієчник");
    break;
  case 2:
    arrayPupil.push("двієчник");
    alert("двієчник");
    break;
}

// 6. Chess
let charFirst = "#";
// let b = "0";
let charSecond = "⠀";
const chessF = () => {
  for (let j = 1; j < 10; j++) {
    switch (j % 2) {
      case 0:
        charFirst = "#";
        charSecond = "⠀";
        break;
      case 1:
        charFirst = "⠀";
        charSecond = "#";
        break;
    }
    // if (!(j % 2)) {
    //   a = " ";
    //   b = "#";
    // }
    // if (j % 2) {
    //   a = "#";
    //   b = " ";
    // }

    for (let i = 0; i < 100; i++) {
      if (i % 2) {
        document.write(charFirst);
      } else {
        document.write(charSecond);
      }
    }
    document.write("<br />");
  }
};
chessF();

// 7. triangle

const triangleF = () => {
  const char = "#";
  let charSum = "#";
  let i = 0;
  do {
    document.write(charSum);
    document.write("<br />");
    charSum += char;
    i++;
  } while (i < 7);
};
// function triangleF() {
//   let char = "#";
//   let charSum = "#";
//   for (let i = 0; i < 7; i++) {
//     document.write(charSum);
//     document.write("<br />");
//     charSum += char;
//   }
// }
triangleF();
