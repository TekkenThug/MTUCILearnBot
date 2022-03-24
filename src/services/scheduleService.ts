import weekdays from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import 'dayjs/locale/ru';
import dayjs, { Dayjs } from 'dayjs';
import { isEvenWeek } from '@/utils';
import { getTimes, getSchedule as getScheduleFromAPI } from './api';
import { ScheduleTime, LessonsSet } from '@/types/schedule';

dayjs.extend(weekdays);
dayjs.extend(weekOfYear);
dayjs.locale('ru');

/**
 * Get date by input time
 * @param time - Input time
 */
const getDateByTime = (time: ScheduleTime): Dayjs => {
  switch (time) {
    case 'today':
      return dayjs();

    case 'tomorrow':
      return dayjs().add(1, 'day');
  }
};

/**
 * Get schedule
 * @param userID - user id for getting right schedule
 * @param time - time interval for right schedule
 */
export const getSchedule = async (userID: number, time: ScheduleTime) => {
  const workDate = getDateByTime(time);

  const schedule = await getScheduleFromAPI({
    even: isEvenWeek(workDate) ? 'even' : 'odd',
    weekday: workDate.weekday(),
    userID
  });

  if (!Array.isArray(schedule)) {
    return schedule.status === 'HOLIDAY' ? 'Это выходной!' : 'Извините, расписание отсутствует :(';
  }

  const timeDict = await getTimes();

  schedule.forEach((item) => {
    const targetTime = timeDict.find(time => time.number === item.number);

    if (targetTime) {
      item.time = targetTime.time;
    }

    (item.type as string) = LessonsSet[item.type];
  });

  return schedule;
};
