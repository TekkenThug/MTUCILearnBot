import { Dayjs } from 'dayjs';

/**
 * Parse string into
 * @param source - Source string
 * @param single - True, if source string contains only one param
 */
export const parseParameters = (source: string, single = true): string | string[] => {
  return single ? source.split('_')[1] : source.split('_').slice(1);
};

/**
 * Returns true, if input date located on even week
 * @param dateToCompare - Input date
 */
export const isEvenWeek = (dateToCompare: Dayjs) => dateToCompare.week() % 2 === 0;
