const TelegramBot = require('node-telegram-bot-api');
const token = '1608798236:AAHDzQWo8Qw9qAmKBdSkSEDjl2mz-NKdDKY';
const bot = new TelegramBot(token, { polling: true });

const application = require('./src/js/app-data.js'); // Данные для приложения
const keyboards = require('./src/js/keyboards.js'); // Клавиатуры


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

      bot.sendMessage(id, `
Расписание на сегодня (${day} ${month}, ${weekday}) для группы БСТ1902 \u{1F4CC}
------------------------------------------------------------
1. Иностранный язык - {времяНачала - времяКонца}
2. Базовые средства МП - {времяНачала - времяКонца}
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


