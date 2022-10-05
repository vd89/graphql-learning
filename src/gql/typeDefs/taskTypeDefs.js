import { gql } from 'apollo-server-express';

const taskTypeDefs = gql`
  extend type Query {
    tasks:[Task!]
    task(_id: ID!): Task
  }
  input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
  }
  extend type Mutation {
    createTask(input: createTaskInput!): Task
  }

  type Task {
    _id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }
`;

export default taskTypeDefs;
