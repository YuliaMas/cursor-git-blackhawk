// 1. Создайте функцию getRandomArray(length, min, max) – которая возвращает массив случайных целых чисел.
//		В функции есть параметры: length - длина массива, min – минимальное значение целого числа, max – максимальное
//		значение целого числа. Пример: getRandomArray(15, 1, 100) –> [6, 2, 55, 11, 78, 2, 55, 77, 57, 87, 23, 2, 56, 3, 2]

function getRandomArray(length, min, max) {
  const randomArr = [];
  if (length <= 0) {
    return "Введіть  ціле додатне число в полі довжина масиву";
  }
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * (max + 1 - min) + min);
    randomArr.push(randomNum);
    console.log(randomNum);
  }
  return randomArr;
  // return randomArr.join(" , ").split(",");
}

// 3.  Создайте функцию getAverage(...numbers) – которая считает среднее арифметическое всех переданных в неё аргументов. НЕЦЕЛЫЕ ЧИСЛА ИГНОРИРУЮТСЯ
// Пример: getAverage(6, 2, 55, 11, 78, 2, 55, 77, 57, 87, 23, 2, 56, 3, 2) –> 34.4

function getAverage(numbers) {
  let num = numbers;
  // const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // for (let num of numArr) {
  // let num = 0;
  // let i = 0;
  // while (i < numbers.length) {
  //   num += num;
  //   i++;
  // }
  // let num = numbers.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   0
  // );
  let result = num.reduce(function (sum, current) {
    return sum + current;
  }, 0);
  const average = result / num.length;
  return average;
}
