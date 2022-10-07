import debug from 'debug';

import Task from '../database/models/taskModel.js';
import User from '../database/models/userModel.js';
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

export const getAllTaskByUser = async (_userId) => {
  try {
    // const _query = {};
    // const tasks = await Task.find(_query).sort({ _id: -1 }).limit(_limit + 1);
    const tasks = await Task.find({ user: _userId });
    return tasks;
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
