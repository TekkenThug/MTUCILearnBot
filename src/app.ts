import mongoose from 'mongoose';
import { Telegraf } from 'telegraf';
import { CustomContext } from '@/types/global';
import commands from '@/commands/command';
import queryProvider from '@/providers';

const Bot = new Telegraf<CustomContext>(process.env.TG_TOKEN as string);

console.log(process.env.MONGO_URL);

/** Bot launching */
mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log('MongoDB is connected'))
  .then(() => {
    /** Commands registration */
    commands.forEach(item => Bot.command(item.name, item.handler));

    /** Handler for commands registration */
    queryProvider.forEach(query => Bot.action(query.trigger, query.action));

    return Bot.launch();
  })
  .then(() => console.log('Bot has started'));
