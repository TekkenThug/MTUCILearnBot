import { Group, Time, ServiceResponse } from '@/types/api';
import { Lesson } from '@/types/schedule';
import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.DEV_SERVER_URL}/api`
});

/** Get groups list */
export const getGroups = (page = 1, limit = 0) =>
  API.get<Group[]>('/group', { params: { page, limit } }).then((response) => response.data);

/** Get times list */
export const getTimes = () =>
  API.get<Time[]>('/time').then((response) => response.data);

/** Get schedule */
export const getSchedule = ({
  even,
  weekday,
  userID
}: {
  even: 'odd' | 'even';
  weekday: number;
  userID: number;
}) => {
  return API.get<Lesson[] | ServiceResponse>('/schedule', {
    params: {
      even,
      weekday,
      userID
    }
  }).then((response) => response.data);
};

/** Update user group */
export const updateUserGroup = (group: string, userID: number) => {
  return API.patch<string>(`/user/${userID}`, {
    params: {
      group
    }
  }).then((response) => response.data);
};
