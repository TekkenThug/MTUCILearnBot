import { Markup } from 'telegraf';
import { emoji } from 'node-emoji';

export default Markup.inlineKeyboard([
  Markup.button.callback(`${emoji.orange_book} Расписание на сегодня`, 'getSchedule_today'),
  Markup.button.callback(`${emoji.green_book} Расписание на завтра`, `getSchedule_tomorrow`),
  Markup.button.callback(`${emoji.blue_book} Расписание на текущую неделю`, 'getSchedule_week')
]);
