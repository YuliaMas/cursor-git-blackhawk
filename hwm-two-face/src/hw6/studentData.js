//1. повертає список предметів для конкретного студента
export function getSubjects(student) {
  const subjects = Object.keys(student.subjects);
  return subjects.map(
    (subject) =>
      subject.slice(0, 1).toUpperCase() + subject.slice(1).replace("_", " ")
  );
}

// 2. поверне середню оцінку по усім предметам для переданого студента
export function getAverageMark(student) {
  const marksObj = Object.values(student.subjects);
  const marks = [];
  let sumMarks = 0;
  let sumObj = 0;
  for (let mark of marksObj) {
    let sum = 0;
    sumObj = mark.reduce((acc, num) => {
      sum = acc + num;
      return sum;
    }, 0);
    marks.push(sumObj);
    sumMarks += mark.length;
  }
  return marks.reduce((acc, num) => acc + num, 0) / sumMarks;
}

// 3.повертає інформацію загального виду по переданому студенту
export function getStudentInfo(student) {
  return {
    name: student.name,
    course: student.course,
    average: getAverageMark(student),
  };
}

// 4. повертає імена студентів у алфавітному порядку.
export function getStudentsNames(students) {
  return students.map((student) => student.name).sort();
}

// 5. повертає кращого студента зі списку по показнику середньої оцінки.
export function getBestStudent(students) {
  let bestAverMark;
  let bestStudent = null;
  const names = [];
  const average = [];
  for (let student of students) {
    average.push(getAverageMark(student));
    names.push(student.name);
  }

  bestAverMark = Math.max(...average);
  const obj = Object.assign(
    ...names.map((name, i) => ({ [name]: average[i] }))
  );

  for (const [key, value] of Object.entries(obj)) {
    if (value === bestAverMark) {
      bestStudent = `${key}`;
    }
  }
  return bestStudent;
}

// 6. повертає обє'кт, в якому ключі це букви у слові, а значення – кількість їх повторень.
export function calculateWordLetters(string) {
  const word = string.split("");
  const obj = {};
  for (let i = 0; i < string.length; i++) {
    const letter = word[i];
    if (obj[letter]) {
      obj[letter] += 1;
    } else obj[letter] = 1;
  }
  return obj;
}

export function getStringObject(obj) {
  let list = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      list += `"${key}" :  ${obj[key]}, `;
    }
  }
  return list;
}
