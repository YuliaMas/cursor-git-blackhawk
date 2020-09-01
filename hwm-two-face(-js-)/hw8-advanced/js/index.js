class Student {
  constructor(fullName, university, course) {
    this.fullName = fullName;
    this.university = university;
    this.course = course;
    this._marksArr = [];
    this.markPress = false;
    this.isDismiss = false;
  }

  getInfo() {
    const info = `Студент ${this.course}го курсу  ${this.university}  ${this.fullName}`;
    if (this.isDismiss) {
      return `${info} відрахований з інституту`;
    } else {
      return `${info}`;
    }
  }

  get marks() {
    if (!this.isDismiss && this.markPress) {
      return this._marksArr;
    } else return null;
  }

  set marks(mark) {
    if (mark >= 1 && mark <= 5 && !this.isDismiss) {
      this.markPress = true;
      this._marksArr.push(mark);
      return this._marksArr;
    } else return null;
  }

  getAverageMark() {
    if (!this.isDismiss) {
      return Number(
        this._marksArr.reduce((acc, num) => acc + num, 0) /
          this._marksArr.length
      ).toFixed(1);
    } else return null;
  }

  dismiss() {
    this.isDismiss = true;
  }

  recover() {
    this.isDismiss = false;
  }
}

// Advanced
class BudgetStudent extends Student {
  constructor(fullName, university, course) {
    super(fullName, university, course);
    this.scholarship = 1400;
  }

  getScholarship() {
    if (!this.isDismiss && this.getAverageMark() >= 4.0) {
      return `Ви отримали ${this.scholarship} грн. стипендії`;
    } else {
      return "Наразі ви не можете отримати стипендію, навчайтесь краще...";
    }
  }
}

const students = new Student(
  "Остап Бендер",
  "Вищої Школи Психотерапії м.Одеса",
  1
);

const studentBudget = new BudgetStudent(
  "Julia Naymko",
  'National University "Lviv Polytechnic"',
  6
);

const marksArr = [5, 4, 4, 5];
for (let mark of marksArr) {
  students.marks = mark;
}
const marksArr1 = [5, 4, 4, 3, 5];
for (let mark of marksArr1) {
  studentBudget.marks = mark;
}

/*
У цьому завданні вам необхідно створити клас Student та розробляти методи всередині цього класу.

У стдентів повинні бути наступні властивості: university, course, fullName, вони передаються при створенні студента(в конструктор).
Створіть метод this.getInfo() -> "Студент 1го курсу Вищої Школи Психотерапії м.Одеса, Остап Родоманський Бендер", метод повертає сукупну інформацію про курс, учбовий заклад та імені студента.
Створіть геттер оцінок this.marks, який повертає масив оцінок студента [5, 4, 4, 5]
Створіть сеттер оцінок this.marks = 5, який дозволяє поставити оцінку студенту. Після того, як оцінка поставлена, геттер повинен повернути масив this.marks -> [5, 4, 4, 5, 5]
Створіть метод отримання середнього балу this.getAverageMark() -> 4.6
Створіть метод this.dismiss, який "виключить" студента. Після виклику цього методу – ставити студенту оцінки та отримувати їх більше не можна. (Ніяких помилок, просто повертається завжди null замість масиву оцінок)
Створіть метод this.recover, який дозволить поновити студента

Advanced

Створіть новий клас BudgetStudent, який повністю наслідує клас Student
Бюджетний студент може отримати стипендію за допомогою методу this.getScholarship. Отримання стипендії супроводжується виведенням інформації в консоль: Ви отримали 1400 грн. стипендії
Студент отримує стипендію тільки в тому випадку, якщо середній бал у нього вище або дорівнює 4.0
Якщо студента виключено, він не отримує стипендію (думаю це було і так очевидно :) )
 */
