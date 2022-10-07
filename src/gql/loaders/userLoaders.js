import debug from 'debug';
import User from '../../database/models/userModel.js';

const loggers = debug('app:userLoaders -> ');

export const bachUsers = async (userIds) => {
  loggers(userIds);
  const users = await User.find({ _id: { $in: userIds } });
  return userIds.map((userId) => users.find((user) => user.id === userId));
};
