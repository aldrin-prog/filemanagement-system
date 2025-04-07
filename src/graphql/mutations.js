/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createResources = /* GraphQL */ `
  mutation CreateResources(
    $input: CreateResourcesInput!
    $condition: ModelResourcesConditionInput
  ) {
    createResources(input: $input, condition: $condition) {
      id
      fullname
      email
      phoneNumber
      category
      subject
      message
      files
      createdAt
      updatedAt
      usersResourcesId
      __typename
    }
  }
`;
export const updateResources = /* GraphQL */ `
  mutation UpdateResources(
    $input: UpdateResourcesInput!
    $condition: ModelResourcesConditionInput
  ) {
    updateResources(input: $input, condition: $condition) {
      id
      fullname
      email
      phoneNumber
      category
      subject
      message
      files
      createdAt
      updatedAt
      usersResourcesId
      __typename
    }
  }
`;
export const deleteResources = /* GraphQL */ `
  mutation DeleteResources(
    $input: DeleteResourcesInput!
    $condition: ModelResourcesConditionInput
  ) {
    deleteResources(input: $input, condition: $condition) {
      id
      fullname
      email
      phoneNumber
      category
      subject
      message
      files
      createdAt
      updatedAt
      usersResourcesId
      __typename
    }
  }
`;
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
      username
      email
      password
      role
      resources {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
      username
      email
      password
      role
      resources {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      id
      username
      email
      password
      role
      resources {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
