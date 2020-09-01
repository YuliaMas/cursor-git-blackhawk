const ukraine = {
  tax: 0.195,
  middleSalary: 1789,
  vacancies: 11476,
};
const latvia = {
  tax: 0.25,
  middleSalary: 1586,
  vacancies: 3921,
};
const litva = {
  tax: 0.15,
  middleSalary: 1509,
  vacancies: 1114,
};

let timerId;
const countryName = [ukraine, latvia, litva];
const name = ["Ukraine", "Latvia", "Lytva"];

function stopTimeout() {
  clearTimeout(timerId);
}
// 1. Створіть функцію getMyTaxes.call(country, salary) -> number; –
// яка рахує скільки податків ви заплатите як IT-спеціаліст в якійсь з країн.
// Функція повинна викликатись через call та працювати з даними через this

function getMyTaxes(salary) {
  return parseFloat((salary * this.tax).toFixed(2));
}

// 2. Створіть функцію getMiddleTaxes.call(country) -> number; – яка рахує скільки
// у середньому податків платять IT-спеціалісти у кожній країні. (tax * middleSalary).
// Функція повинна викликатись через call та працювати з даними через this

function getMiddleTaxes() {
  return parseFloat((this.tax * this.middleSalary).toFixed(2));
}

// 3. Створіть функцію getTotalTaxes.call(country) -> number; – яка рахує,
// скільки всього податків платять IT-спеціалісти у кожній країні.
// (tax * middleSalary * vacancies). Функція повинна викликатись через call та працювати з даними через this.

function getTotalTaxes() {
  return parseFloat((this.tax * this.middleSalary * this.vacancies).toFixed(2));
}

// 4. Створіть функцію getMySalary(country) – яка буде писати в консоль об'єкт виду:
// { salary: number, taxes: number, profit: number } кожні 10 секунд. Значення salary –
// генеруйте випадковим чином у діапазоні 1500-2000. taxes – розраховується в залежності від
// вибраної країни та значення salary. profit = salary - taxes;

function getMySalary() {
  const min = 1500;
  const max = 2000;
  const salary = Math.floor(Math.random() * (max - min + 1) + min);
  const taxes = parseFloat((salary * this.tax).toFixed(2));
  const profit = parseFloat((salary - taxes).toFixed(2));
  const countrySalary = {
    salary,
    taxes,
    profit,
  };
  return countrySalary;
}
