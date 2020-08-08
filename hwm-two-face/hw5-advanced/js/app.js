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
  const result = {};
  numbers.forEach(function (acc) {
    // counts repeats
    if (result[acc] !== undefined) ++result[acc];
    else result[acc] = 1;
  });
  const res = Object.entries(result);
  let max = res.sort((a, b) => {
    return a[1] - b[1];
  });
  let modaLast = max[max.length - 1][1];
  // find moda
  let moda = [];
  for (let i = 0; i < max.length; i++) {
    if (max[i][1] === modaLast) {
      moda.push(max[i][0]);
    }
  }
  return moda;
}

// 3.  Функція рахує середнє арифметичне всіх переданих в неї аргументів.
function getAverage(numbers) {
  const result = numbers.reduce(function (sum, current) {
    return sum + current;
  }, 0);
  const average = result / numbers.length;
  if (isNaN(average)) {
    throw new Error(" The mistake is in the first task, correct , please!");
  }
  return average;
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
    ? numbers[medianOdd]
    : 0.5 * (numbers[medianEven] + numbers[medianEven + 1]);
}

//5. Функцію  фільтрує парні числа
function filterEvenNumbers(numbers) {
  return numbers.filter((item) => item % 2);
}

// 6. Функція рахує кількість чисел більших 0
function countPositiveNumbers(numbers) {
  return numbers.filter((item) => item > 0).length;
}

// 7. Функція  відфільтровує усі елементи в масиві та залишає ті,що діляться на ціло на 5.
function getDividedByFive(numbers) {
  return numbers.filter((item) => !(item % 5));
}

// 8. Функція замінює погані слова на зірочки (*).
function replaceBadWords(string) {
  const regex = /(shit|fuck)/gi;
  return string.replace(regex, "****");
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
  return arrDivideW;
}

// 10. Функція видає всі можливі перестановки(унікальні, без повторень) букв в слові.
function generateCombinations(word) {
  const str = word.toLowerCase();
  if (str.length > 10) throw new Error(`Введіть слово довжиною до 10 букв`);
  if (str.length < 2) return word;

  const comb = [];
  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (str.indexOf(char) !== i) continue; // порівняння на дублікати

    const combString = str.slice(0, i) + str.slice(i + 1, str.length);

    for (let someCombination of generateCombinations(combString)) {
      comb.push(char + someCombination);
    }
  }
  return comb;
}
