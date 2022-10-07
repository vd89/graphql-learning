import debug from 'debug';

import { createTaskByUser, deleteTasksByUser, getAllTaskByUser, getTaskOfUser, updateTaskByUser } from '../../controller/taskController.js';
import { getUserById } from '../../controller/userController.js';
import { combine, isAuth, isTaskOwner } from '../../helper/gqlResolvers.js';

const logger = debug('app:taskResolver');

const taskResolvers = {
  Query: {
    tasks: combine(isAuth, async (_, { cursor, limit=10 }, { loggedInUserId }) =>{
      return await getAllTaskByUser(cursor, limit, loggedInUserId);
    }),
    task: combine(isAuth, isTaskOwner, async (_, { id }) => await getTaskOfUser(id)),
  },
  Mutation: {
    createTask: combine(isAuth, async (_, { input }, { email }) => await createTaskByUser(input, email)),
    updatedTask: combine(isAuth, isTaskOwner, async (_, { id, input }) => await updateTaskByUser(id, input)),
    deleteTask: combine(isAuth, isTaskOwner, async (_, { id }, { loggedInUserId }) =>{
      return await deleteTasksByUser(id, loggedInUserId);
    }),
  },

  Task: {
    user: async ({ user }, _, { loaders }) => await getUserById(user, loaders),
  },
};

export default taskResolvers;
