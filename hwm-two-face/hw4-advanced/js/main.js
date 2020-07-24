const students = ["Саша", "Ігор", "Олена", "Іра", "Олексій", "Світлана"];
const themes = [
  "Диференційне рівняння",
  "Теорія автоматів",
  "Алгоритми і структури даних",
];
const marks = [4, 5, 5, 3, 4, 5];

// Розділіть студентів на пари(хлопець + дівчина) для работи над проєктом.
function getPairs(arr) {
  const studentsSort = [...arr].sort();
  const pairs = [];
  let i = 0;
  while (i < studentsSort.length) {
    pairs.push([studentsSort[i], studentsSort[i + 1]]);
    i += 2;
  }
  return pairs;
}

// Зіставте пари з getPairs() та теми проєктів, над якими студенти будуть працювати.
function getThemes(arrN, arrM) {
  const pairTheme = [...arrN];
  let themes = [...arrM];
  themes = themes.sort();
  let j = 0;
  pairTheme.forEach(() => {
    pairTheme[j] = pairTheme[j].join(" і ").split(" , ");
    j++;
  }, []);
  // for (let j = 0; j < pairs.length; j++) {
  //   const x = document.getElementById("demo");
  //   pairs[j] = pairs[j].join(" i ");
  //   x.innerHTML = arr1;
  // }
  let i = 0;
  pairTheme.forEach(() => {
    pairTheme[i].push(themes[i]);
    i++;
  }, []);
  return pairTheme;
}

// Зіставте оцінки(marks) зі студентом(students).
function getMark(arr, numArr) {
  let students = [...arr];
  let marks = [...numArr];
  let studentMark = [];
  for (let i = 0; i < students.length; i++) {
    studentMark.push([students[i], marks[i]]);
  }
  return studentMark;
}

// Рандомна оцінка від 1 до 5:
function randomMark() {
  const min = 1;
  const max = 6;
  return Math.floor(Math.random() * (max - min) + min);
}

// Поставте кожній парі випадкову оцінку(від 1 до 5) за проєкт.
function getRandomMark(array) {
  let projectMark = array.map((arr) => arr.slice());
  for (let i = 0; i < projectMark.length; i++) {
    projectMark[i].push(randomMark());
  }
  return projectMark;
}

const pairs = getPairs(students);
const pairTheme = getThemes(pairs, themes);
const markPupil = getMark(students, marks);
const projectMark = getRandomMark(pairTheme);
console.log(pairs);
console.log(pairTheme);
console.log(markPupil);
console.log(projectMark);

const card1 = document.querySelectorAll(".p1");
function setPairs() {
  let i = 0;
  for (let pair of pairs) {
    const pair = `${i + 1} пара: ${pairs[i].join(" , ")}`;
    card1[i].textContent = `${pair}`;
    i++;
  }
}
card1.textContent = setPairs(pairs);

const card2 = document.querySelectorAll(".p2");
function setThemes() {
  let i = 0;
  for (let some of pairTheme) {
    const pairSomeone = `${i + 1} пара: ${pairTheme[i].join(" , ")}`;
    card2[i].textContent = `${pairSomeone}`;
    i++;
  }
}
card2.textContent = setThemes(pairTheme);

const card3 = document.querySelectorAll(".p3");
function setEveryMark() {
  let i = 0;
  for (let mark of markPupil) {
    const markEvery = `${i + 1}: ${markPupil[i].join(" , ")}`;
    card3[i].textContent = `${markEvery}`;
    i++;
  }
}
card3.textContent = setEveryMark(markPupil);

const card4 = document.querySelectorAll(".p4");
function setProjectMark() {
  let i = 0;
  for (let mark of projectMark) {
    const project = `${i + 1} пара: ${projectMark[i].join(" , ")}`;
    card4[i].textContent = `${project}`;
    i++;
  }
}
card4.textContent = setProjectMark(projectMark);
