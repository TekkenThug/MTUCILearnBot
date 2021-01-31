const { Telegraf } = require('telegraf');

const bot = new Telegraf("1608798236:AAHDzQWo8Qw9qAmKBdSkSEDjl2mz-NKdDKY");

bot.start(ctx => ctx.reply("Добро пожаловать на сервер Шальные сиськи!"));

bot.launch();