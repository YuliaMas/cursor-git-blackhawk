//1. повертає список предметів для конкретного студента
function getSubjects(student) {
  const subjects = Object.keys(student.subjects);
  return subjects.map(
    (subject) =>
      subject.slice(0, 1).toUpperCase() + subject.slice(1).replace("_", " ")
  );
  //   for (let i = 0; i < subjects.length; i++) {
  //     if (subjects[i].includes("_")) {
  //       subjects[i] = subjects[i].replace("_", " ");
  //     }
  //     subjects[i] =
  //       subjects[i][0].toUpperCase() + subjects[i].slice(1).toLowerCase();
  //   }
  //   return `${students.name} :   ${subjects.join(" , ")}`;
  // }
}

// 2. поверне середню оцінку по усім предметам для переданого студента
function getAverageMark(student) {
  const marksObj = Object.values(student.subjects);
  const marks = [];
  let sumMarks = 0;
  for (let mark in marksObj) {
    marks.push(
      marksObj[mark].reduce((acc, num) => {
        sum = acc + num;
        return sum;
      }, 0)
    );
    sumMarks += marksObj[mark].length;
  }
  return marks.reduce((acc, num) => acc + num, 0) / sumMarks;
}

// 3.повертає інформацію загального виду по переданому студенту
function getStudentInfo(student) {
  return {
    name: student.name,
    course: student.course,
    average: getAverageMark(student),
  };
}

// 4. повертає імена студентів у алфавітному порядку.
function getStudentsNames(students) {
  return students.map((student) => student.name).sort();
  // let arr = [];
  // for (let key in students) arr.push(students[key].name);
  // return arr.sort();
}

// 5. повертає кращого студента зі списку по показнику середньої оцінки.
function getBestStudent(students) {
  let bestAverMark = 0;
  let bestStudent = null;
  const names = [];
  const average = [];

  for (let student in students) {
    average.push(getAverageMark(students[student]));
    names.push(students[student].name);
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
function calculateWordLetters(string) {
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

function getStringObject(obj) {
  let list = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      list += `"${key}" :  ${obj[key]}, `;
    }
  }
  return list;
}
