import { Markup } from 'telegraf';
import { getGroups } from '@/services/api';

export const groupKeyboard = async () => {
  const groups = await getGroups();

  const arr: ReturnType<typeof Markup.button.callback>[][] = [[], []];

  groups.forEach((group, index) => {
    const rowToShow = index > 2 ? 1 : 0;

    arr[rowToShow].push(Markup.button.callback(group.name, `setGroup_${group.name}`));
  });

  return Markup.inlineKeyboard(arr);
};
