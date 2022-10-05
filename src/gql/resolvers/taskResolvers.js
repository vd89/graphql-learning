import { v4 } from 'uuid';

import { tasks, users } from '../../constants/index.js';
import debug from 'debug';

const logger = debug('app:taskResolver');

const taskResolvers = {
  Query: {
    tasks: () => tasks(),
    task: (_, { _id }) => tasks().find((task) => task._id === _id),
  },
  Mutation: {
    createTask: (_, { input }) => {
      const task = { ...input, _id: v4() };
      logger(task);
      tasks().push(task);
      return task;
    },
  },

  Task: {
    user: ({ userId }) => users().find((user) => user._id === userId),
  },
};

export default taskResolvers;
