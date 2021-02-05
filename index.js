const TelegramBot = require('node-telegram-bot-api');               // Подключение модуля Telegram
const token = '1608798236:AAHDzQWo8Qw9qAmKBdSkSEDjl2mz-NKdDKY';     // Токен
const bot = new TelegramBot(token, { polling: true });              // Экземпляр модуля

const application = require('./src/js/app-data.js');                // Данные для приложения
const keyboards = require('./src/js/keyboards.js');                 // Клавиатуры

const MongoClient = require('mongodb').MongoClient;                 // Связь с клиентом MongoDb
const dbName = "Schedule";                                          // Имя БД
const urlConnect = 'mongodb+srv://administrator:,fpflfyys[@cluster0.paq35.mongodb.net/Schedule';                    // Адрес подключения


/* Commands */
bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;

  bot.sendPhoto(chatId, 'src/img/start-screen.png', {
    caption: `
      Добро пожаловать в MTUCILearnBot!\n\nБот предназначен для информирования студентов МТУСИ о расписании занятий.\n\nПожалуйста, введите название своей группы.`
  });

  bot.on("message", (msg) => {
    schedule.groupName = msg.text;

    bot.sendMessage(chatId, `Вы из группы ${msg.text}`,);
    bot.removeListener("message");
  });

});

bot.onText(/\/dashboard/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Выберите интересующее Вас время", {
    reply_markup: {
      inline_keyboard: keyboards.scheduleKeyboard
    }
  })
});

bot.onText(/\/options/, msg => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, `Выбранная группа ${schedule.groupName}`);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  if (query.data === 'today') {
    schedule.today(chatId);
  }

  if (query.data === 'tomorrow') {
    schedule.tomorrow(chatId);
  }

  if (query.data === 'week') {
    schedule.week(chatId);
  }
});

/* Schedule object */
const schedule = {
  groupName: '',

  today: async function (id) {
    const date = new Date();

    if (validateDate(date)) {
      const day = date.getDate();
      const weekday = application.calendar.weekday[date.getDay()];
      const month = application.calendar.month[date.getMonth()];

      bot.sendMessage(id, `
\u{1F4C6} Расписание на сегодня (${day} ${month}, ${weekday})
Группа: БСТ1902
${await getTimetable(date)}`);
    } else {
      bot.sendMessage(id, `На этот день нет расписания \u{1F60E}`);
    }
  },

  tomorrow: async function (id) {
    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate.getTime() + (24 * 60 * 60 * 1000));

    if (validateDate(tomorrowDate)) {
      const day = tomorrowDate.getDate();
      const weekday = application.calendar.weekday[tomorrowDate.getDay()];
      const month = application.calendar.month[tomorrowDate.getMonth()];

      bot.sendMessage(id, `
\u{1F4C6} Расписание на завтра (${day} ${month}, ${weekday})
Группа: БСТ1902
${await getTimetable(tomorrowDate)}`);
    } else {
      bot.sendMessage(id, `На этот день нет расписания \u{1F60E}`);
    }
  },

  week: async function (id) {
    const date = new Date();

    bot.sendMessage(id, `
\u{1F4C6} Расписание на неделю
Группа: БСТ1902
${await getTimetableForWeek(date)}`);
  }
};

/* Functions */
function validateDate(date) {
  if (date.getDay() == 0 || date.getDay() == 6) {
    return false;
  } else {
    return true;
  }
}

function isEvenWeek(date) {
  let odd = false;

  const startDate = new Date(date.getFullYear(), 0, 1);
  const startDay = startDate.getDay();

  let difference = Math.round((date - startDate) / (1000 * 60 * 60 * 24 * 7));

  if (startDay <= 4) {
    difference++;
    //console.log(difference)
  }

  if (date.getDay() == 1) {
    difference++;
    //console.log(difference)
  }

  difference % 2 ? odd = true : odd = false;

  if (odd) {
    return "odd"
  } else {
    return "even"
  }
}

function msgLayout(subject, count) {
  const name = subject.name ? subject.name : "-",
        type = subject.type ? subject.type : "-",
        number = subject.number,
        classroom = subject.classroom ? subject.classroom : "-",
        author = subject.author ? subject.author : "-";

  let msg =
    `------------------------------------------------
${count}. ${name}
${application.lessonType[type]}
Время: ${application.intervals[number]}
Аудитория: ${classroom}
Преподаватель: ${author}
`;

  return msg
}

async function queryToDB(odd, weekdayName, isWeekSchedule = false) {
  const client = await MongoClient.connect(urlConnect);
  const db = client.db(dbName);
  const resultDocument = await db.collection('Groups').findOne({ groupName: "БСТ1902" });

  client.close();

  return !isWeekSchedule ? resultDocument[odd][weekdayName] : resultDocument[odd];
}

async function getTimetable(date) {
  const odd = isEvenWeek(date);
  const weekdayName = application.weekdayName[date.getDay()];
  const scheduleDayArray = await queryToDB(odd, weekdayName);

  let msgAnswerText = ``;
  let count = 1;

  for (let subject of scheduleDayArray) {
    msgAnswerText += msgLayout(subject, count);
    count++;
  }

  return msgAnswerText
}

async function getTimetableForWeek(date) {

  const odd = isEvenWeek(date);
  const scheduleArray = await queryToDB(odd, 0, true);

  let msgAnswerText = ``;
  let dayCount = 1;

  for (let day in scheduleArray) {
    let count = 1;
    msgAnswerText += `\n******${application.calendar.weekday[dayCount]}******\n`;

    for (let subject of scheduleArray[day]) {
      msgAnswerText += msgLayout(subject, count);
      count++;
    }

    dayCount++;
  }

  return msgAnswerText
}

