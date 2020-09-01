window.addEventListener("DOMContentLoaded", () => {
  function task1() {
    const setSubject = document.querySelector(".subjects");
    if (!setSubject.childNodes.length) {
      for (let student of students) {
        setSubject.innerHTML += `
          <div class="card">
            <h3 class="card__title">${student.name}</h3>
               <p class="card-item">
                 ${getSubjects(student).join(" , </br>")}
               </p>
          </div>`;
      }
    }
  }

  function task2() {
    const setAverageMark = document.querySelector(".averMarks");
    if (!setAverageMark.childNodes.length) {
      for (let student of students) {
        setAverageMark.innerHTML += `
          <div class="card">
            <h3 class="card__title">${student.name}</h3>
               <p class="card-item">
                 ${getAverageMark(student).toFixed(2)}
               </p>
          </div>`;
      }
    }
  }

  function task3() {
    const setInfo = document.querySelector(".info");
    if (!setInfo.childNodes.length) {
      for (let student of students) {
        getStudentInfo(student);
        setInfo.innerHTML += `
          <div class="card">
               <p class="card-item">
               <span> student name:      ${student.name};        </span>
               <span>  course:            ${student.course};     </span>   
               <span>  average mark:      ${getAverageMark(student).toFixed(
                 2
               )}; </span>
               </p>
          </div>`;
      }
    }
  }

  function task4() {
    const setSortNames = document.querySelector(".sortNames");
    setSortNames.innerHTML = `
          <div class="card">
               <p class="card-item">
                 ${getStudentsNames(students).join(" , ")}
               </p>
          </div>`;
  }

  function task5() {
    const setBestStudentName = document.querySelector(".bestStud");
    setBestStudentName.innerHTML = `
          <div class="card">
               <p class="card-item">
                 ${getBestStudent(students)}
               </p>
          </div>`;
  }

  function task6() {
    const getWord = document.querySelector("#word").value;
    const setCountLetters = document.querySelector(".letters");
    setCountLetters.innerHTML = `
          <div class="card">
               <p class="card-item">
                 ${getStringObject(calculateWordLetters(getWord))}
               </p>
          </div>`;
  }

  /* - - - - - - - - - - - - - - Buttons click - - - - - - - - - - - - - -*/

  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("click-1")) {
      `${task1()}`;
    }
    if (event.target.classList.contains("click-2")) {
      `${task2()}`;
    }
    if (event.target.classList.contains("click-3")) {
      `${task3()}`;
    }
    if (event.target.classList.contains("click-4")) {
      `${task4()}`;
    }
    if (event.target.classList.contains("click-5")) {
      `${task5()}`;
    }
    if (event.target.classList.contains("click-6")) {
      `${task6()}`;
    }
  });
});
