/** Time for schedule getting */
export type ScheduleTime = 'today' | 'tomorrow';

/** Lesson types */
type LessonType = 'Lecture' | 'Practice' | 'Laboratory';

/** Lesson for schedule */
export interface Lesson {
  /** Serial number */
  number: number;

  /** Name of lesson */
  name: string;

  /** Lesson type */
  type: LessonType;

  /** Lesson time (start and end) */
  time: string;

  /** Cabinet number where lesson is taught */
  cabinet: string;

  /** Teacher name */
  teacher: string;
}
