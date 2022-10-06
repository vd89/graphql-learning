import { tasks, users } from '../../constants/index.js';
import { loginController, signupController } from '../../controller/userController.js';

const userResolvers = {
  Query: {
    users: () => users(),
    user: (_, { _id })=> users().find((user) => user._id === _id),
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
