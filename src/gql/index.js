import { ApolloServer } from 'apollo-server-express';

import resolvers from './resolvers/index.js';
import typeDefs from './typeDefs/index.js';


const APServer = new ApolloServer({
  typeDefs,
  resolvers,
});
export default APServer;
