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

export const pairs = getPairs(students);
export const pairTheme = getThemes(pairs, themes);
export const markPupil = getMark(students, marks);
export const projectMark = getRandomMark(pairTheme);
