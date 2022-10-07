import { gql } from 'apollo-server-express';

const taskTypeDefs = gql`
  extend type Query {
    tasks(cursor: String, limit: Int ): TaskFeed!
    task(id: ID!): Task
  }
  input createTaskInput {
    name: String!
    completed: Boolean!
  }
  input updateTaskInput {
    name: String
    completed: Boolean
  }
  extend type Mutation {
    createTask(input: createTaskInput!): Task
    updatedTask(id: ID!, input:updateTaskInput!): Task
    deleteTask(id: ID!): Task
  }

  type TaskFeed {
    taskFeed: [Task!]
    pageInfo: PageInfo!
  }

  type PageInfo {
    nextPageCursor: String
    hasNextPage: Boolean
  }
  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
    createdAt: Date!
    updatedAt: Date!
    message: String!
  }
`;

export default taskTypeDefs;
