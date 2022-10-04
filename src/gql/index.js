import _apolloServer from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { tasks, users } from '../constants/index.js';


const { ApolloServer, gql } = _apolloServer;

const typeDefs = gql`
  type Query {
    hello: String!
    james: [Int!]!
    tasks:[Task!]
    users:[User!]
  }
  type User {
    _id: ID!
    name: String!
    email: String!
    tasks: [Task!]
  }
  type Task {
    _id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Thi is working',
    james: () => [1, 2, 3, 3],
    tasks: () => tasks(),
    users: () => users(),
  },
  Task: {
    user: ({ userId }) => users().find((user) => user._id === userId),
  },
};


const APServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground,
  ],
});
export default APServer;
