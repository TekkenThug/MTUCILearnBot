const TelegramBot = require('node-telegram-bot-api');          
const token = '1608798236:AAHDzQWo8Qw9qAmKBdSkSEDjl2mz-NKdDKY';    
const bot = new TelegramBot(token, { polling: true });      

const application = require('./src/js/app-data.js');          
const keyboards = require('./src/js/keyboards.js');         

const MongoClient = require('mongodb').MongoClient;               
const dbName = require('./src/js/mongo.js').dbName;
const urlConnect = require('./src/js/mongo.js').urlConnect;


/* Commands */
bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;

  bot.sendPhoto(chatId, 'src/img/start-screen.png', {
    caption: `
      Добро пожаловать в MTUCILearnBot!\n\nБот предназначен для информирования студентов МТУСИ о расписании занятий.\n\nПожалуйста, введите название своей группы в формате БСТ1902.`
  });

  bot.on("message", async (msg) => {
    await setGroupForUser(chatId, msg.from.id, msg.text);

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

  bot.sendMessage(chatId, `Настройки`, {
    reply_markup: {
      inline_keyboard: keyboards.optionsKeyboard
    }
  });
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;

  if (query.data === 'today') {
    const group = await getGroupForUser(query.from.id);
    schedule.today(chatId, group);
  }

  if (query.data === 'tomorrow') {
    const group = await getGroupForUser(query.from.id);
    schedule.tomorrow(chatId, group);
  }

  if (query.data === 'week') {
    const group = await getGroupForUser(query.from.id);
    schedule.week(chatId, group);
  }

  if (query.data === "changeGroup") {
    bot.sendMessage(chatId, "Введите новую группу в формате БСТ1902");

    bot.on("message", async (msg) => {
      await setGroupForUser(chatId, msg.from.id, msg.text);

      bot.removeListener("message");
    });
  }

  if (query.data === "feedback") {
    bot.sendMessage(chatId, "Напишите отзыв о боте, ваши пожелания или недочеты. Автор проекта обязательно их увидит :)")

    bot.on("message", (msg) => {
      bot.sendMessage(440762160, `${msg.text}`);
      bot.removeListener("message")
    })
  }
});

/* Schedule object */
const schedule = {
  today: async function (id, group) {
    const date = new Date();

    if (validateDate(date)) {
      const day = date.getDate();
      const weekday = application.calendar.weekday[date.getDay()];
      const month = application.calendar.month[date.getMonth()];

      bot.sendMessage(id, `
\u{1F4C6} Расписание на сегодня (${day} ${month}, ${weekday})
Группа: БСТ1902
${await getTimetable(date, group)}`);
    } else {
      bot.sendMessage(id, `На этот день нет расписания \u{1F60E}`);
    }
  },

  tomorrow: async function (id, group) {
    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate.getTime() + (24 * 60 * 60 * 1000));

    if (validateDate(tomorrowDate)) {
      const day = tomorrowDate.getDate();
      const weekday = application.calendar.weekday[tomorrowDate.getDay()];
      const month = application.calendar.month[tomorrowDate.getMonth()];

      bot.sendMessage(id, `
\u{1F4C6} Расписание на завтра (${day} ${month}, ${weekday})
Группа: БСТ1902
${await getTimetable(tomorrowDate, group)}`);
    } else {
      bot.sendMessage(id, `На этот день нет расписания \u{1F60E}`);
    }
  },

  week: async function (id, group) {
    const date = new Date();

    bot.sendMessage(id, `
\u{1F4C6} Расписание на неделю
Группа: БСТ1902
${await getTimetableForWeek(date, group)}`);
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

  const startDate = new Date(2021, 1, 1);
  const variableWeek = 7 * 24 * 60 * 60 * 1000;

  const diff = Math.floor((date.getTime() - startDate.getTime()) / variableWeek)

  diff % 2 ? odd = false : odd = true;

  if (odd) {
    return "odd"
  } else {
    return "even"
  }
}

function msgLayout(subject, number, count) {
  const name = subject.name ? subject.name : "-",
    type = subject.type ? subject.type : "-",
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

async function queryToDB(group, odd, weekdayName, isWeekSchedule = false) {
  const client = await MongoClient.connect(urlConnect);
  const db = client.db(dbName);
  const resultDocument = await db.collection('Groups').findOne({ groupName: group});

  client.close();

  return !isWeekSchedule ? resultDocument[odd][weekdayName] : resultDocument[odd];
}

async function getTimetable(date, group) {
  const odd = isEvenWeek(date);
  const weekdayName = application.weekdayName[date.getDay()];
  const scheduleDayArray = await queryToDB(group, odd, weekdayName);

  let msgAnswerText = ``;
  let count = 1;

  for (let subject in scheduleDayArray) {
    if (scheduleDayArray[subject]['name'] !== "") {
      console.log(scheduleDayArray[subject]);
      msgAnswerText += msgLayout(scheduleDayArray[subject], subject, count);
      count++;
    }
  }

  return msgAnswerText
}

async function getTimetableForWeek(date, group) {

  const odd = isEvenWeek(date);
  const scheduleArray = await queryToDB(group, odd, 0, true);

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

async function setGroupForUser(chatId, id, group) {
  const client = await MongoClient.connect(urlConnect);
  const db = client.db(dbName);
  const validGroup = await db.collection('Groups').findOne({ groupName: group });

  if (!validGroup) {
    bot.sendMessage(chatId, "Такой группы, к сожалению, нет в базе :(")
  } else {
    const result = await db.collection('Users').findOne({ userId: id });

    if (!result) {
      const insert = await db.collection('Users').insertOne({ userId: id, groupName: group });
      bot.sendMessage(chatId, "Группа успешно обновлена!")
    } else {
      const update = await db.collection('Users').updateOne({ userId: id }, { $set: { "groupName": group } });
      bot.sendMessage(chatId, "Группа успешно обновлена!")
    }
  }

  client.close();
}

async function getGroupForUser(id) {
  const client = await MongoClient.connect(urlConnect);
  const db = client.db(dbName);
  const group = await db.collection('Users').findOne({ userId: id });

  client.close();
  
  return group.groupName;
}



