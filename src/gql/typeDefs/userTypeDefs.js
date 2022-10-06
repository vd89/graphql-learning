import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
extend type Query {
  users:[User!]
  user(_id: ID!): User!
}

extend type Mutation {
  signup(input: signupInput): User
  login(input: loginInput): User
}

input loginInput {
  email: String!
  password: String!
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
  token: String
}

`;


export default userTypeDefs;
