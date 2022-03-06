import { ExtraPhoto } from 'telegraf/typings/telegram-types';
import { Lesson } from '@/types/schedule';
import { daySchedule } from './layouts';

/**
 * Returns separator for layouts
 */
export const separator = () => {
  const count = 10;
  const separatorLineSymbol = '-';
  const separatorLine = ['\n'];

  for (let i = 0; i < count; i++) {
    separatorLine.push(separatorLineSymbol);
  }

  separatorLine.push('\n');

  return separatorLine.join('');
};

/**
 * Concat layouts with custom separator
 * @param rawData Data to operate
 */
const concatLayouts = (rawData: Array<string>): string => {
  return rawData.join(separator() as string);
};

/**
 * Create caption (for photo)
 * @param text Text for caption
 */
export const createCaption = (text: string): ExtraPhoto => {
  return {
    caption: text,
    parse_mode: 'HTML'
  };
};

/**
 * Returns schedule day view
 * @param lessons Array of lessons
 */
export const scheduleView = (lessons: Array<Lesson>) => {
  return concatLayouts(lessons.map(lesson => daySchedule(lesson)));
};
