window.addEventListener("DOMContentLoaded", () => {
  const getInfo = document.querySelector(".p1");
  const getAllMarks = document.querySelector(".p3");
  const putNewMark = document.querySelector(".p2");
  const getAverage = document.querySelector(".p4");
  const getInfoBud = document.querySelector(".p5");
  const getAllMarksBud = document.querySelector(".p7");
  const putNewMarkBud = document.querySelector(".p6");
  const getAverageBud = document.querySelector(".p8");
  const scholarship = document.querySelector(".p9");
  const checkBox = document.getElementById("dismiss");
  const checkBox2 = document.getElementById("recover");
  const checkBoxBud = document.getElementById("dismissBud");
  const checkBoxBud2 = document.getElementById("recoverBud");
  const pItem = document.querySelector(".p-item");
  const text = document.getElementById("text");
  const pItemBud = document.querySelector(".p-itemBud");
  const textBud = document.getElementById("textBud");

  function setInfoStudent(pre, info, marks, aver) {
    info.innerHTML = `${pre.getInfo()}`;
    marks.innerHTML = `Всі оцінки студента: ${pre.marks}`;
    aver.innerHTML = `Середній бал студента : ${pre.getAverageMark()}`;
  }

  function getMarkPush() {
    const getMark = +document.querySelector("#getMark").value;
    putNewMark.innerHTML = `Ставимо оцінку ${(students.marks = getMark)} `;
    getAllMarks.innerHTML = `Всі оцінки студента: ${students.marks}`;
    getAverage.innerHTML = `Середній бал студента : ${students.getAverageMark()}`;
  }

  function getMarkPushBudget() {
    const getMarkBud = +document.querySelector("#getMarkBud").value;
    putNewMarkBud.innerHTML = `Ставимо оцінку ${(studentBudget.marks = getMarkBud)} `;
    getAllMarksBud.innerHTML = `Всі оцінки студента: ${studentBudget.marks}`;
    getAverageBud.innerHTML = `Середній бал студента : ${studentBudget.getAverageMark()}`;
  }

  function getDismissF() {
    if (checkBox.checked === true) {
      putNewMark.style.display = "none";
      pItem.style.display = "block";
      text.style.display = "block";
      text.textContent = `Студент ${students.fullName} відрахований `;
    } else {
      pItem.style.display = "none";
      text.style.display = "none";
      putNewMark.style.display = "block";
    }
  }

  function getDismissBudF() {
    if (checkBoxBud.checked) {
      putNewMarkBud.style.display = "none";
      pItemBud.style.display = "block";
      textBud.style.display = "block";
      textBud.textContent = `Студент ${studentBudget.fullName} відрахований `;
    } else {
      pItemBud.style.display = "none";
      textBud.style.display = "none";
      putNewMarkBud.style.display = "block";
    }
  }

  function getRecoverF() {
    if (checkBox2.checked === true) {
      text.style.display = "block";
      text.textContent = `Студент ${students.fullName} зарахований `;
      pItem.style.display = "block";
    } else {
      pItem.style.display = "none";
      text.style.display = "none";
    }
  }

  function getRecoverBudF() {
    if (checkBoxBud2.checked) {
      pItemBud.style.display = "block";
      textBud.style.display = "block";
      textBud.textContent = `Студент ${studentBudget.fullName} зарахований `;
    } else {
      pItemBud.style.display = "none";
      textBud.style.display = "none";
    }
  }

  function getScholarshipF() {
    scholarship.innerHTML = `${studentBudget.getScholarship()}`;
  }

  /*------------------------------Buttons-----------------------------*/

  document.getElementById("click-info").addEventListener("click", () => {
    if (students.dismiss) {
      `${setInfoStudent(students, getInfo, getAllMarks, getAverage)}`;
    }
  });
  document.getElementById("click-mark").addEventListener("click", () => {
    if (students.dismiss) {
      `${getMarkPush()}`;
    } else return null;
  });

  checkBox.addEventListener("click", () => {
    `${getDismissF(students.dismiss())}`;
  });

  checkBox2.addEventListener("click", () => {
    `${getRecoverF(students.recover())}`;
  });

  // Budget Student

  document.getElementById("click-infoBudget").addEventListener("click", () => {
    if (studentBudget.dismiss) {
      `${setInfoStudent(
        studentBudget,
        getInfoBud,
        getAllMarksBud,
        getAverageBud
      )}`;
    }
  });

  document.getElementById("click-markBudget").addEventListener("click", () => {
    if (studentBudget.dismiss) {
      `${getMarkPushBudget()}`;
    } else return null;
  });

  checkBoxBud.addEventListener("change", () => {
    `${getDismissBudF(studentBudget.dismiss())}`;
  });

  checkBoxBud2.addEventListener("change", () => {
    `${getRecoverBudF(studentBudget.recover())}`;
  });

  document.getElementById("click-scholarship").addEventListener("click", () => {
    `${getScholarshipF(studentBudget.getScholarship())}`;
  });

  /*--------------------------------Display in the console--------------------------------*/

  console.log(`Повна інформація по студенту: ${students.getInfo()}`);
  console.log(`Всі оцінки студента: \n ${students.fullName}: `, students.marks);
  console.log(
    `Ставимо оцінку ${(students.marks = 5)}. Поточні оцінки студента: `,
    students.marks
  );
  console.log(`Середній бал студента : ${students.getAverageMark()}`);
  console.log(`Відраховуємо студента `);
  students.dismiss();
  console.log(
    `Ставимо оцінку ${(students.marks = 5)}. Поточні оцінки студента: `,
    students.marks
  );
  console.log(`Середній бал студента : ${students.getAverageMark()}`);
  console.log(`Повна інформація по студенту: ${students.getInfo()}`);
  console.log(`Зараховуємо студента `);
  students.recover();
  console.log(
    `Ставимо оцінку ${(students.marks = 5)}. Поточні оцінки студента: `,
    students.marks
  );

  console.log(`Всі оцінки студента: \n ${studentBudget.fullName}: `, marksArr1);
  console.log(
    `Ставимо оцінку ${(studentBudget.marks = 5)}. Поточні оцінки студента: `,
    studentBudget.marks
  );
  console.log(`Середній бал студента : ${studentBudget.getAverageMark()}`);
  console.log(studentBudget.getScholarship());
});
