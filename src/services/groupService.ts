import User from '../models/user';

/**
 * Set group for user
 * @param id - User id
 * @param group - Group for set
 */
export const setGroup = async (id: string | number, group: string) => {
  await User.findOneAndUpdate({ userID: id }, { $set: { id, group } }, { upsert: true });
};
