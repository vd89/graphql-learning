import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
extend type Query {
  users:[User!]
  user(_id: ID!): User!
}

type User {
  _id: ID!
  name: String!
  email: String!
  tasks: [Task!]
}

`;


export default userTypeDefs;
