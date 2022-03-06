import weekdays from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import 'dayjs/locale/ru';
import dayjs, { Dayjs } from 'dayjs';
import { isHoliday, isEvenWeek, LessonsType } from '@/utils';
import User from '@/models/user';
import Schedule from '@/models/schedule';
import Time from '@/models/time';
import { Lesson, ScheduleTime } from '@/types/schedule';

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

  if (isHoliday(workDate)) return 'Это выходной!';

  const scheduleRecord = await Schedule.findOne({
    group: await User.findOne({ userID }).distinct('group')
  }).select('schedule');

  const schedule = scheduleRecord.schedule[isEvenWeek(workDate) ? 'even' : 'odd'][workDate.weekday()].lessons as Array<Lesson>;
  const timeDict = await Time.find({});

  schedule.forEach((item) => {
    item.time = timeDict.find(time => time.number === item.number).time;
    (item.type as string) = LessonsType[item.type];
  });

  return schedule;
};
