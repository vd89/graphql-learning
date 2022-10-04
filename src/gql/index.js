/* eslint-disable new-cap */
import _apolloServer from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';


const { ApolloServer, gql } = _apolloServer;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};


const APServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});
export default APServer;
