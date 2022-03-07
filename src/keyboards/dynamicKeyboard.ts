import { Markup } from 'telegraf';
import Group from '@/models/group';

export const groupKeyboard = async () => {
  const groups = await Group.find({}).sort('name').limit(6);

  const arr: ReturnType<typeof Markup.button.callback>[][] = [[], []];

  groups.forEach((group, index) => {
    const rowToShow = index > 2 ? 1 : 0;

    arr[rowToShow].push(Markup.button.callback(group.name, `setGroup_${group.name}`));
  });

  return Markup.inlineKeyboard(arr);
};
