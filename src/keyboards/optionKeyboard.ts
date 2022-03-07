import { Markup } from 'telegraf';
import { emoji } from 'node-emoji';

export default Markup.inlineKeyboard([
  Markup.button.callback(`${emoji.arrows_counterclockwise} Сменить группу`, 'option_changeGroup'),
  Markup.button.url(`${emoji.love_letter} Оставить фидбэк`, 'google.com')
]);
