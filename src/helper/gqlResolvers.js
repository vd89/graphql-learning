
import debug from 'debug';
import { isValidObjectId } from 'mongoose';
import Task from '../database/models/taskModel.js';

const skip = undefined;
const logger = debug('app:gqlResolvers -> ');
/**
 * Left-first composition for methods of any type.
 *
 * @param {[Function]} ...funcs Resolver implementations.
 * @return {Promise}.
 */
export const combine = (...funcs) => (...args) =>
  funcs.reduce(
      (prevPromise, resolver) =>
        prevPromise.then((prev) => (prev === skip ? resolver(...args) : prev)),
      Promise.resolve(),
  );


export const isAuth = (_, __, { email }) => {
  if (!email) {
    throw new Error('Access Denied! please login to continue');
  }
  return skip;
};

export const isTaskOwner = async (_, { id }, { loggedInUserId }) => {
  try {
    if (!isValidObjectId(id)) {
      throw new Error('Id is not valid Object Id');
    }
    const task = await Task.findById(id);
    if (!task) {
      throw new Error('Task not Found');
    } else if (task.user.toString() !== loggedInUserId) {
      throw new Error('Not Authorized as task owner');
    } else {
      return skip;
    }
  } catch (err) {
    logger(err.message);
    throw err;
  }
};
