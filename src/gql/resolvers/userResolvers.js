import debug from 'debug';
import { tasks } from '../../constants/index.js';
import { loginController, signupController, getUserData } from '../../controller/userController.js';
// eslint-disable-next-line import/namespace
import { combine, isAuth } from '../../helper/gqlResolvers.js';

const logger = debug('app:userResolv -> ');

const userResolvers = {
  Query: {
    user: combine(isAuth, async (_, __, { email })=> await getUserData(email)),
  },

  Mutation: {
    signup: async (_, { input }) => await signupController(input),
    login: async (_, { input }) => await loginController(input),
  },

  User: {
    tasks: ({ _id }) => tasks().filter((task) => task.userId === _id),
  },
};

export default userResolvers;
