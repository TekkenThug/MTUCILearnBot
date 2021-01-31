const keyboardOfSchedule = [
  [
    {
      text: '\u{1F4D5} Расписание на сегодня',
      callback_data: 'today'
    }
  ],
  [
    {
      text: '\u{1F4D9} Расписание на завтра',
      callback_data: 'tomorrow'
    }
  ],
  [
    {
      text: '\u{1F4D7} Расписание на неделю',
      callback_data: 'week'
    }
  ]
];

module.exports.scheduleKeyboard = keyboardOfSchedule;