import { Dayjs } from 'dayjs';

/** Interface for custom date functions */
interface DateWorker {
  (date: Dayjs): boolean
}

/**
 * Parse string into
 * @param source - Source string
 * @param single - True, if source string contains only one param
 */
export const parseParameters = (source: string, single = true): string | string[] => {
  return single ? source.split('_')[1] : source.split('_');
};

/**
 * Returns true, if input date is holiday
 * @param dateToCompare - Input date
 */
export const isHoliday: DateWorker = (dateToCompare) => dateToCompare.weekday() === 5 || dateToCompare.weekday() === 6;

/**
 * Returns true, if input date located on even week
 * @param dateToCompare - Input date
 */
export const isEvenWeek: DateWorker = (dateToCompare) => dateToCompare.week() % 2 === 0;
