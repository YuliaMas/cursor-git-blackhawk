// 1. Функція повертає масив випадкових  цілих чисел.
function getRandomArray(length, min, max) {
  const randomArr = [];
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * (max + 1 - min) + min);
    randomArr.push(randomNum);
  }
  return randomArr;
}

// 2. Функція обчислює моду всіх переданих в неї аргументів.
function getModa(numbers) {
  const arr = numbers;
  const result = {};
  arr.forEach(function (acc) {
    // рахує кількість повторень
    if (result[acc] !== undefined) ++result[acc];
    else result[acc] = 1;
  });
  const res = Object.entries(result); // створює об'єкт і виводить пари значень
  res.forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    return `${key}: ${value}`;
  });
  // сортує в об'єкті value
  let max = res.sort((a, b) => {
    return a[1] - b[1];
  });
  let modaLast = max[max.length - 1][1];
  // знаходить моду
  let moda = [];
  for (let i = 0; i < max.length; i++) {
    if (max[i][1] === modaLast) {
      moda.push(max[i][0]);
    }
  }
  return ` moda: ${moda.join(" , ")}`;
}

// 3.  Функція рахує середнє арифметичне всіх переданих в неї аргументів.
function getAverage(numbers) {
  const num = numbers;
  const result = num.reduce(function (sum, current) {
    return sum + current;
  }, 0);
  const average = result / num.length;
  if (isNaN(average)) {
    return " В 1-му завданні помилка, виправте , будь ласка!";
  }
  return `Середнє арифметичне значення: ${average.toFixed(2)}`;
  // const reducer = (accumulator, currentValue) => accumulator + currentValue;   // 1-ий варіант
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
}

// 4. Функція рахує медіану.
function getMedian(numbers) {
  const medianEven = Math.floor((numbers.length - 1) / 2);
  const medianOdd = Math.floor(numbers.length / 2);
  numbers.sort(function (a, b) {
    return a - b;
  });
  return numbers.length % 2 === 1
    ? "Mедіана: " + numbers[medianOdd]
    : "Mедіана: " + 0.5 * (numbers[medianEven] + numbers[medianEven + 1]);
}

//5. Функцію  фільтрує парні числа
function filterEvenNumbers(numbers) {
  const numOdd = numbers.filter((item) => item % 2).join(" , ");
  return `Непарні числа: ${numOdd}`;
}

// 6. Функція рахує кількість чисел більших 0
function countPositiveNumbers(numbers) {
  const positiveNum = numbers.filter((item) => {
    return item > 0;
  });
  return "Кількість додатних чисел: " + positiveNum.length;
}

// 7. Функція  відфільтровує усі елементи в масиві та залишає ті,що діляться на ціло на 5.
// Приклад: getDividedByFive(6, 2, 55, 11, 50, 2, 55, 40, 57, 87, 23, 5, 56, 3, 2) -> [55, 55]
function getDividedByFive(numbers) {
  const dividedByFive = numbers.filter((item) => {
    return !(item % 5);
  });
  return `Числа кратні 5: [ ${dividedByFive.join(" , ")} ]`;
}

// 8. Функція замінює погані слова на зірочки (*).
function replaceBadWords(string) {
  const regex = /(shit|fuck)/gi;
  const newStr = string.replace(regex, "****");
  return `Модифіковане речення: ${newStr}`;
}

// 9. Функція розбиває кожне слово на умовні склади по 3 букви.
function divideByThree(word) {
  if (word.length < 3) return word;
  word = word.toLowerCase().split(" ").join("");
  const arrDivideW = [];
  for (let i = 0; i < word.length; i += 3) {
    const divWord = word.substr(i, 3);
    arrDivideW.push(divWord);
  }
  return `Розбите слово:  ${arrDivideW}`;
}

// 10. Створіть функцію generateCombinations(word), яка видасть всі можливі перестановки(унікальні, без повторень)
// букв в слові. Для тестів не передавайте слова в яких більше 10 букв. Краще взагалі обмежити работу функції 10 буквами.
// Приклад: generateCombinations("man") -> ["man", "mna", "amn", "anm", "nam", "nma"] Приклад: generateCombinations("ol")
// -> ["ol", "lo"]
function generateCombinations(word) {
  let str = word.toLowerCase();
  if (word.length > 10) return "vveditb slovo menwoi dovgwunu";
}
generateCombinations("man");
