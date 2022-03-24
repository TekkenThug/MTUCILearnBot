import { Markup } from 'telegraf';
import { emoji } from 'node-emoji';
import { getGroups } from '@/services/api';

export default async (page = 1) => {
  const limitResults = 4;
  const groups = await getGroups(page, limitResults);
  const probablyGroups = await getGroups(page + 1, limitResults);

  const arr: ReturnType<typeof Markup.button.callback>[][] = [[], [], []];

  groups.forEach((group, index) => {
    const rowToShow = index >= 2 ? 1 : 0;

    arr[rowToShow].push(Markup.button.callback(group.name, `setGroup_${group.name}`));
  });

  if (page !== 1) {
    arr[2].push(Markup.button.callback(emoji.arrow_left, `setGroup_left_${page}`));
  }

  if (probablyGroups.length > 0) {
    arr[2].push(Markup.button.callback(emoji.arrow_right, `setGroup_right_${page}`));
  }

  return Markup.inlineKeyboard(arr);
};
