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
    task(_id: ID!): Task
    user(_id: ID!): User!
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
    user: (_, { _id })=> users().find((user) => user._id === _id),
    task: (_, { _id }) => tasks().find((task) => task._id === _id),
  },
  Task: {
    user: ({ userId }) => users().find((user) => user._id === userId),
  },
  User: {
    tasks: ({ _id }) => tasks().filter((task) => task.userId === _id),
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
