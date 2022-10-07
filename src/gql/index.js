import { ApolloServer } from 'apollo-server-express';
import debug from 'debug';
import { verifyUser } from '../helper/context.js';

import resolvers from './resolvers/index.js';
import typeDefs from './typeDefs/index.js';

const logger = debug('app:gqlIndex -> ');

const APServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    await verifyUser(req);
    logger(req.email);
    return {
      email: req.email,
      loggedInUserId: req.loggedInUserId,
    };
  },
});
export default APServer;
