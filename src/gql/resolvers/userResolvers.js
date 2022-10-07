import debug from 'debug';
import { getTaskByUserId } from '../../controller/taskController.js';
import { loginController, signupController, getUserData } from '../../controller/userController.js';

import { combine, isAuth } from '../../helper/gqlResolvers.js';

const logger = debug('app:userResolver -> ');

const userResolvers = {
  Query: {
    user: combine(isAuth, async (_, __, { email })=> await getUserData(email)),
  },

  Mutation: {
    signup: async (_, { input }) => await signupController(input),
    login: async (_, { input }) => await loginController(input),
  },

  User: {
    tasks: async ({ id }) => await getTaskByUserId(id),
  },
};

export default userResolvers;
