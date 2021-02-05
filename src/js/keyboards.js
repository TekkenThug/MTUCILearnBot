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
      text: '\u{1F4D7} Расписание на текущую неделю',
      callback_data: 'week'
    }
  ]
];

const keyboardsOfOptions = [
  [
    {
      text: '\u{1F504} Сменить группу',
      callback_data: 'changeGroup'
    }
  ],
  [
    {
      text: '\u{1F48C} Оставить фидбэк',
      callback_data: 'feedback'
    }
  ]
]

module.exports.scheduleKeyboard = keyboardOfSchedule;
module.exports.optionsKeyboard = keyboardsOfOptions;