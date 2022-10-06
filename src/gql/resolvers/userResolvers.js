import { tasks, users } from '../../constants/index.js';
import User from '../../database/models/userModel.js';
import debug from 'debug';
import { decrypt, encrypt } from '../../helper/encryptHelper.js';

const logger = debug('app:userResolver ->');


const userResolvers = {
  Query: {
    users: () => users(),
    user: (_, { _id })=> users().find((user) => user._id === _id),
  },

  Mutation: {
    signup: async (_, { input }) => {
      try {
        const { email, password, name } = input;
        const user = await User.findOne({ email: email });
        if (user) {
          user.message= 'User already exist';
          return user;
        }
        const hashedPassword = await encrypt(password);
        const newUser = new User({ name, email, password: hashedPassword });
        newUser.message = 'User Created';
        const result = await newUser.save();
        return result;
      } catch (err) {
        logger(err.message);
      }
    },
  },

  User: {
    tasks: ({ _id }) => tasks().filter((task) => task.userId === _id),
  },
};

export default userResolvers;
