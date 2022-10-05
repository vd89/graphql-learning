import { gql } from 'apollo-server-express';
import taskTypeDefs from './taskTypeDefs.js';
import userTypeDefs from './userTypeDefs.js';

const typeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

`;

export default [typeDefs, taskTypeDefs, userTypeDefs];
