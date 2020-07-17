//  1.	Змінна n зберігає ціле число від 0 до 9. Використовуючи оператор switch, написати скрипт, який в
// залежності від числа буде виводити слово (Наприклад, якщо n дорівнює 3, то буде виводитися слово «три»)
let n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < n.length; i++) {
  const randomNumber = Math.floor(Math.random() * n[i]);

  switch (randomNumber) {
    case 0:
      alert("0 - zero");
      break;
    case 1:
      alert("1 - one");
      break;
    case 2:
      alert("2 - two");
      break;
    case 3:
      alert("3 - three");
      break;
    case 4:
      alert("4 - four");
      break;
    case 5:
      alert("5 - five");
      break;
    case 6:
      alert("6 - six");
      break;
    case 7:
      alert("7 - seven");
      break;
    case 8:
      alert("8 - eight");
      break;
    case 9:
      alert("9 - nine");
      break;
    default:
      alert("number");
      break;
  }
}

//2.	Використовуючи document.write () і будь-яку з циклічних конструкцій виведіть десять
// однакових зображень (треба виводити <img src = "..." alt = "..." />)
// for (let i = 0; i <= 10; i++) {
//   let img = document.createElement("img");
//   document.write(img);
// }

const container = document.createDocumentFragment();
for (let i = 1; i <= 10; i++) {
  const div = document.createElement("div");
  container.appendChild(div);
  let img = div.appendChild(document.createElement("img"));
  img.src = "img/berry.png";
  img.alt = "berries";
}
document.body.appendChild(container);

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
const arr = [100, 80, 60, 50, 40, 20, 10, 0];
for (let i = 0; i <= arr.length - 1; i++) {
  document.write(`Число: <b> ${arr[i]} </b>`);
}
