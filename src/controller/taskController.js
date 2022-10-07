import debug from 'debug';

import Task from '../database/models/taskModel.js';
import User from '../database/models/userModel.js';
import { base64ToString, stringToBase64 } from '../helper/converter.js';
const logger = debug('app:taskController -> ');


export const getTaskByUserId = async (_userId) => {
  try {
    logger(_userId);
    const tasks = await Task.find({ user: _userId });
    return tasks;
  } catch (err) {
    logger(err.message);
    throw err;
  }
};

export const createTaskByUser = async (_input, _email) => {
  try {
    const user = await User.findOne({ email: _email });
    const task = new Task({ ..._input, user: user._id });
    const result = await task.save();
    user.tasks.push(result.id);
    await user.save();
    result.message = 'Create new task ';
    return result;
  } catch (err) {
    logger(err.message);
    throw err;
  }
};

export const getAllTaskByUser = async (_cursor, _limit, _userId) => {
  try {
    const _query = { user: _userId };
    if (_cursor) {
      _query['_id'] = {
        '$lt': base64ToString(_cursor),
      };
    }
    let tasks = await Task.find(_query).sort({ _id: -1 }).limit(_limit + 1);
    const hasNextPage = tasks.length > _limit;
    tasks = hasNextPage ? tasks.slice(0, -1) : tasks;

    return {
      taskFeed: tasks,
      pageInfo: {
        nextPageCursor: hasNextPage ? stringToBase64(tasks[tasks.length -1].id) : null,
        hasNextPage,
      },
    };
  } catch (err) {
    logger(err.message);
    throw err;
  }
};

export const getTaskOfUser = async (id) => {
  try {
    logger(id);
    const task = await Task.findById(id);
    return task;
  } catch (err) {
    logger(err.message);
    throw err;
  }
};

export const updateTaskByUser = async (id, input) => {
  try {
    const task = await Task.findByIdAndUpdate(id, { ...input }, { new: true });
    task.message = 'Task is Updated successfully';
    return task;
  } catch (err) {
    logger(err.message);
    throw err;
  }
};

export const deleteTasksByUser = async (id, userId) => {
  try {
    const task = await Task.findByIdAndDelete(id);
    await User.updateOne({ _id: userId }, { $pull: { tasks: task.id } });
    task.message = 'Task is deleted';
    return task;
  } catch (err) {
    logger(err.message);
    throw err;
  }
};
