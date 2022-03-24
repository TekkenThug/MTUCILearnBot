import { Context } from 'telegraf';
import { helloMessage, scheduleTitle, optionsTitle } from '@/views/layouts';
import { createCaption } from '@/views/view';
import optionKeyboard from '@/keyboards/optionKeyboard';
import scheduleKeyboard from '@/keyboards/scheduleKeyboard';
import groupKeyboard from '@/keyboards/groupKeyboard';

/**
 * Starting bot command
 * @param ctx
 */
const startHandler = async (ctx: Context) => {
  await ctx.replyWithPhoto({
    source: 'src/assets/images/start-screen.png'
  }, createCaption(helloMessage()));

  await ctx.reply('Выбор', await groupKeyboard());
};

/**
 * Open schedule options
 * @param ctx
 */
const scheduleHandler = async (ctx: Context) => {
  await ctx.reply(scheduleTitle, scheduleKeyboard);
};

/**
 * Open options
 * @param ctx
 */
const optionsHandler = async (ctx: Context) => {
  await ctx.reply(optionsTitle, optionKeyboard);
};

export default [
  {
    name: 'start',
    handler: startHandler
  },
  {
    name: 'options',
    handler: optionsHandler
  },
  {
    name: 'schedule',
    handler: scheduleHandler
  }
];
