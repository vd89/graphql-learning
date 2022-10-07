import { ApolloServer } from 'apollo-server-express';
import DataLoader from 'dataloader';
import debug from 'debug';
import { verifyUser } from '../helper/context.js';
import { bachUsers } from './loaders/userLoaders.js';

import resolvers from './resolvers/index.js';
import typeDefs from './typeDefs/index.js';

const logger = debug('app:gqlIndex -> ');

const APServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    await verifyUser(req);
    return {
      email: req.email,
      loggedInUserId: req.loggedInUserId,
      loaders: {
        user: new DataLoader((keys) => bachUsers(keys) ),
      },
    };
  },
});
export default APServer;
