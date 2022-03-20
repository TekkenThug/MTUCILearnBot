import { updateUserGroup } from './api';

/**
 * Set group for user
 * @param id - User id
 * @param group - Group for set
 */
export const setGroup = async (id: number, group: string) => {
  await updateUserGroup(group, id);
};
