const TelegramBot = require('node-telegram-bot-api');               // Подключение модуля Telegram
const token = '1608798236:AAHDzQWo8Qw9qAmKBdSkSEDjl2mz-NKdDKY';     // Токен
const bot = new TelegramBot(token, { polling: true });              // Экземпляр модуля

const application = require('./src/js/app-data.js');                // Данные для приложения
const keyboards = require('./src/js/keyboards.js');                 // Клавиатуры

const MongoClient = require('mongodb').MongoClient;                 // Связь с клиентом MongoDb
const dbName = "schedule";                                          // Имя БД
const urlConnect = 'mongodb://localhost:27017/';                    // Адрес подключения


/* Commands */
bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  bot.sendPhoto(chatId, 'src/img/start-screen.png', {
    reply_markup: {
      inline_keyboard: keyboards.scheduleKeyboard,
    },
    caption: `
      Добро пожаловать в MTUCILearnBot!\n\nБот предназначен для информирования студентов группы БСТ1902 о расписании занятий.\n\nПожалуйста, выберите интересующее Вас время.`
  });
});

bot.onText(/\/today/, msg => {
  const chatId = msg.chat.id;
  schedule.today(chatId);
});

bot.onText(/\/tomorrow/, msg => {
  const chatId = msg.chat.id;
  schedule.tomorrow(chatId);
});

bot.onText(/\/week/, msg => {
  const chatId = msg.chat.id;
  schedule.week(chatId);
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
  today: function (id) {
    const date = new Date();

    if (validateDate(date)) {
      const day = date.getDate();
      const weekday = application.calendar.weekday[date.getDay()];
      const month = application.calendar.month[date.getMonth()];

      getTimetable(date);

      bot.sendMessage(id, `
\u{1F4C6} Расписание на сегодня (${day} ${month}, ${weekday}) для группы БСТ1902
------------------------------------------------------------
1. Иностранный язык {Аудитория} {Преподаватель}
   {времяНачала - времяКонца}
------------------------------------------------------------
2. Базовые средства МП {Аудитория} {Преподаватель}
   {времяНачала - времяКонца}
      `);
    } else {
      bot.sendMessage(id, `На этот день нет расписания \u{1F60E}`);
    }
  },

  tomorrow: function (id) {
    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate.getTime() + (24 * 60 * 60 * 1000));

    if (validateDate(tomorrowDate)) {
      const day = tomorrowDate.getDate();
      const weekday = application.calendar.weekday[tomorrowDate.getDay()];
      const month = application.calendar.month[tomorrowDate.getMonth()];

      getTimetable(tomorrowDate);

      bot.sendMessage(id, `
Расписание на завтра (${day} ${month}, ${weekday}) для группы БСТ1902 \u{1F4CC}
--------------------------------------------------
1. Лекция Электроника - {времяНачала - времяКонца}
2. Практика Электроника - {времяНачала - времяКонца}
    `);
    } else {
      bot.sendMessage(id, `На этот день нет расписания \u{1F60E}`);
    }
  },

  week: function (id) {
    bot.sendMessage(id, `
      Нечётная (нижняя) неделя.\n\u{1F4CC} Расписание:
      бла бла бла бла
    `);
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
    console.log(difference)
  }

  if (date.getDay() == 1) {
    difference++;
    console.log(difference)
  }

  difference % 2 ? odd = true : odd = false;

  if (odd) {
    return "odd"
  } else {
    return "even"
  }
}

function queryToDB(odd, weekdayName) {
  let returnArray = [];

  MongoClient.connect(urlConnect, async (error, client) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("Connect successfully to server!")
    }

    const db = client.db(dbName);

    db.collection('groups').findOne({ groupName: "БСТ1902" }, (err, results) => {
      returnArray = JSON.parse(JSON.stringify(results[odd][weekdayName]));
      console.log(returnArray);
    })

    client.close();
  });

  //console.log(returnArray);
}

function getTimetable(date) {
  const odd = isEvenWeek(date);
  const weekdayName = application.weekdayName[date.getDay()];

  queryToDB(odd, weekdayName);
}

