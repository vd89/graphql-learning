import debug from 'debug';

import { createTaskByUser, deleteTasksByUser, getAllTaskByUser, getTaskOfUser, updateTaskByUser } from '../../controller/taskController.js';
import { getUserById } from '../../controller/userController.js';
import { combine, isAuth, isTaskOwner } from '../../helper/gqlResolvers.js';

const logger = debug('app:taskResolver');

const taskResolvers = {
  Query: {
    tasks: combine(isAuth, async (_, __, { loggedInUserId }) => await getAllTaskByUser(loggedInUserId)),
    task: combine(isAuth, isTaskOwner, async (_, { id }) => await getTaskOfUser(id)),
  },
  Mutation: {
    createTask: combine(isAuth, async (_, { input }, { email }) => await createTaskByUser(input, email)),
    updatedTask: combine(isAuth, isTaskOwner, async (_, { id, input }) => await updateTaskByUser(id, input)),
    deleteTask: combine(isAuth, isTaskOwner, async (_, { id }, { loggedInUserId }) =>
      await deleteTasksByUser(id, loggedInUserId)),
  },

  Task: {
    user: async ({ user }) => await getUserById(user),
  },
};

export default taskResolvers;
