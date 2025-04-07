/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateResources = /* GraphQL */ `
  subscription OnCreateResources(
    $filter: ModelSubscriptionResourcesFilterInput
  ) {
    onCreateResources(filter: $filter) {
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
export const onUpdateResources = /* GraphQL */ `
  subscription OnUpdateResources(
    $filter: ModelSubscriptionResourcesFilterInput
  ) {
    onUpdateResources(filter: $filter) {
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
export const onDeleteResources = /* GraphQL */ `
  subscription OnDeleteResources(
    $filter: ModelSubscriptionResourcesFilterInput
  ) {
    onDeleteResources(filter: $filter) {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
