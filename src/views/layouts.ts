import dedent from 'dedent-js';
import { Lesson } from '@/types/global';

/**
 * Hello message
 */
export const helloMessage = () => {
  return dedent(`
      Добро пожаловать в <b>MTUCILearnBot!</b>\n
      Бот предназначен для информирования студентов <b>МТУСИ</b> о расписании занятий.\n
      Пожалуйста, выберите свою учебную группу.
    `);
};

/**
 * Template for day schedule
 * @param {Lesson} params
 */
export const daySchedule = (params: Lesson) => {
  if (!params) return 'Ошибка при получении';

  return dedent(`
    <b>${params.number}. ${params.name}</b>
    <b>Тип</b>: ${params.type}
    <b>Время</b>: ${params.time}
    <b>Аудитория</b>: ${params.cabinet}
    <b>Преподаватель</b>: ${params.teacher}
  `);
};

export const scheduleTitle = 'Выберите интересующее Вас время';

export const optionsTitle = 'Настройки';
