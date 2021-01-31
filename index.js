const TelegramBot = require('node-telegram-bot-api');
const token = '1608798236:AAHDzQWo8Qw9qAmKBdSkSEDjl2mz-NKdDKY';
const bot = new TelegramBot(token, { polling: true });

const keyboard = [
  [
    {
      text: 'Расписание на сегодня',
      callback_data: 'today'
    }
  ],
  [
    {
      text: 'Расписание на завтра',
      callback_data: 'tomorrow'
    }
  ],
  [
    {
      text: 'Расписание на неделю',
      callback_data: 'week'
    }
  ]
];

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  bot.sendPhoto(chatId, 'src/logo.jpg', {
    reply_markup: {
      inline_keyboard: keyboard
    },
    caption: `
      Добро пожаловать в MTUCILearnBot!\n\nБот предназначен для информирования студентов группы БСТ1902 о расписании занятий.\n\nПожалуйста, выберите интересующее Вас время.
      `
  });
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

const schedule = {
  today: function (id) {
    bot.sendMessage(id, `
        Расписание на сегодня для группы БСТ1902:
        1. Иностранный язык
        2. Базовые средства МП
      `);
  },

  tomorrow: function (id) {
    bot.sendMessage(id, `
      Расписание на завтра для группы БСТ1902:
      1. Лекция Электроника
      2. Практика Электроника
    `);
  },

  week: function (id) {
    bot.sendMessage(id, `
      Нечётная (нижняя) неделя. Расписание:
      бла бла бла бла
    `);
  }
};
