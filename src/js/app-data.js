const calendarOptionsRU = {
  month: {
    0: "Январь",
    1: "Февраль",
    2: "Март",
    3: "Апрель",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Август",
    8: "Сентябрь",
    9: "Октябрь",
    10: "Ноябрь",
    11: "Декабрь",
  },
  weekday: {
    0: "Воскресенье",
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
  }
};

const weekdayNameDB = {
  1: "mon",
  2: "tue",
  3: "wed",
  4: "thu",
  5: "fri",
};

const intervalTime = {
  1: "9:30-11:05",
  2: "11:20-12:55",
  3: "13:10-14:45",
  4: "15:25-17:00",
  5: "17:15-18:50",
};

const lessonType = {
  lecture: "Лекция",
  practice: "Практика",
  laboratory: "Лабораторная"
}

module.exports.calendar = calendarOptionsRU;
module.exports.weekdayName = weekdayNameDB;
module.exports.intervals = intervalTime;
module.exports.lessonType = lessonType;
