import gql from "graphql-tag";

export const TodoSchema = gql`
  type Todo {
    id: ID!
    title: String!
    description: String!
    completed: Boolean!
    createdAt: String!
  }

  input TodoInput {
    title: String!
    description: String!
  }

  input UpdateTodoInput{
    id: ID!
      title: String
      description: String
      completed: Boolean
  }

  type GetAllTodosResponse {
    status: Boolean
    message: String
    data: [Todo]
  }

  type GetSingleTodoResponse {
    status: Boolean!
    message: String!
    data: Todo
  }

  type CreateTodoResponse {
    status: Boolean!
    message: String!
  }

  type UpdateTodoDataResponse {
    status: Boolean!
    message: String!
    data: Todo
  }

  type DeleteTodoDataResponse {
    status: Boolean!
    message: String!
  }

  type Query {
    getAllTodos: GetAllTodosResponse!
    getSingleTodo(id: ID!): GetSingleTodoResponse!
  }

  type Mutation {
    createTodo(newTodo:TodoInput!): CreateTodoResponse!
    updateTodo(update:UpdateTodoInput!): UpdateTodoDataResponse!

    deleteTodo(id: ID!): DeleteTodoDataResponse!
  }
`;
