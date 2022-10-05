import { tasks, users } from '../../constants/index.js';

const userResolvers = {
  Query: {
    users: () => users(),
    user: (_, { _id })=> users().find((user) => user._id === _id),
  },
  Mutation: {},
  User: {
    tasks: ({ _id }) => tasks().filter((task) => task.userId === _id),
  },
};

export default userResolvers;
