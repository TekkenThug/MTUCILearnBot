export interface ServiceResponse {
  /** Status code */
  status: 'EMPTY' | 'HOLIDAY';
}

export interface Group {
  /** Group name */
  name: string;
}

export interface Time {
  /** Time position */
  number: number;

  /** Time value in string format */
  time: string;
}
