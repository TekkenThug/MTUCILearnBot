import { Markup } from 'telegraf';
import { emoji } from 'node-emoji';

export default Markup.inlineKeyboard([
  Markup.button.callback(`${emoji.orange_book} На сегодня`, 'getSchedule_today'),
  Markup.button.callback(`${emoji.green_book} На завтра`, `getSchedule_tomorrow`)
]);
