import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  name: String,
  number: Number,
  cabinet: {
    type: String,
    default: '-'
  },
  teacher: {
    type: String,
    default: '-'
  },
  type: {
    type: String,
    required: true,
    enum: ['Practice', 'Lecture', 'Laboratory']
  }
});

const WeekSchema = new Schema({
  weekday: {
    type: String,
    required: true,
    enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  lessons: [LessonSchema]
});

const WeeklyScheduleSchema = new Schema({
  even: [WeekSchema],
  odd: [WeekSchema]
});

const Schedule = new Schema({
  group: {
    type: String,
    ref: 'Group'
  },
  schedule: {
    type: WeeklyScheduleSchema,
    required: true
  }
});

export default mongoose.model('Schedule', Schedule);
