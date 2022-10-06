import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
extend type Query {
  users:[User!]
  user(_id: ID!): User!
}

extend type Mutation {
  signup(input: signupInput): User
}

input signupInput {
  name: String!
  email: String!
  password: String!
}

type User {
  id: ID!
  name: String!
  email: String!
  tasks: [Task!]
  createdAt: Date!
  updatedAt: Date!
  message: String
}

`;


export default userTypeDefs;
