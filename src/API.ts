/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateResourceInput = {
  id?: string | null,
  fullname: string,
  email: string,
  phoneNumber: string,
  category: string,
  subject: string,
  message: string,
  files?: Array< string | null > | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelResourceConditionInput = {
  fullname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  category?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  message?: ModelStringInput | null,
  files?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelResourceConditionInput | null > | null,
  or?: Array< ModelResourceConditionInput | null > | null,
  not?: ModelResourceConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Resource = {
  __typename: "Resource",
  id: string,
  fullname: string,
  email: string,
  phoneNumber: string,
  category: string,
  subject: string,
  message: string,
  files?: Array< string | null > | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateResourceInput = {
  id: string,
  fullname?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  category?: string | null,
  subject?: string | null,
  message?: string | null,
  files?: Array< string | null > | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteResourceInput = {
  id: string,
};

export type ModelResourceFilterInput = {
  id?: ModelIDInput | null,
  fullname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  category?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  message?: ModelStringInput | null,
  files?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelResourceFilterInput | null > | null,
  or?: Array< ModelResourceFilterInput | null > | null,
  not?: ModelResourceFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelResourceConnection = {
  __typename: "ModelResourceConnection",
  items:  Array<Resource | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionResourceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  fullname?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  subject?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  files?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionResourceFilterInput | null > | null,
  or?: Array< ModelSubscriptionResourceFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateResourceMutationVariables = {
  input: CreateResourceInput,
  condition?: ModelResourceConditionInput | null,
};

export type CreateResourceMutation = {
  createResource?:  {
    __typename: "Resource",
    id: string,
    fullname: string,
    email: string,
    phoneNumber: string,
    category: string,
    subject: string,
    message: string,
    files?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type UpdateResourceMutationVariables = {
  input: UpdateResourceInput,
  condition?: ModelResourceConditionInput | null,
};

export type UpdateResourceMutation = {
  updateResource?:  {
    __typename: "Resource",
    id: string,
    fullname: string,
    email: string,
    phoneNumber: string,
    category: string,
    subject: string,
    message: string,
    files?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type DeleteResourceMutationVariables = {
  input: DeleteResourceInput,
  condition?: ModelResourceConditionInput | null,
};

export type DeleteResourceMutation = {
  deleteResource?:  {
    __typename: "Resource",
    id: string,
    fullname: string,
    email: string,
    phoneNumber: string,
    category: string,
    subject: string,
    message: string,
    files?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type GetResourceQueryVariables = {
  id: string,
};

export type GetResourceQuery = {
  getResource?:  {
    __typename: "Resource",
    id: string,
    fullname: string,
    email: string,
    phoneNumber: string,
    category: string,
    subject: string,
    message: string,
    files?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type ListResourcesQueryVariables = {
  filter?: ModelResourceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListResourcesQuery = {
  listResources?:  {
    __typename: "ModelResourceConnection",
    items:  Array< {
      __typename: "Resource",
      id: string,
      fullname: string,
      email: string,
      phoneNumber: string,
      category: string,
      subject: string,
      message: string,
      files?: Array< string | null > | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateResourceSubscriptionVariables = {
  filter?: ModelSubscriptionResourceFilterInput | null,
};

export type OnCreateResourceSubscription = {
  onCreateResource?:  {
    __typename: "Resource",
    id: string,
    fullname: string,
    email: string,
    phoneNumber: string,
    category: string,
    subject: string,
    message: string,
    files?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnUpdateResourceSubscriptionVariables = {
  filter?: ModelSubscriptionResourceFilterInput | null,
};

export type OnUpdateResourceSubscription = {
  onUpdateResource?:  {
    __typename: "Resource",
    id: string,
    fullname: string,
    email: string,
    phoneNumber: string,
    category: string,
    subject: string,
    message: string,
    files?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};

export type OnDeleteResourceSubscriptionVariables = {
  filter?: ModelSubscriptionResourceFilterInput | null,
};

export type OnDeleteResourceSubscription = {
  onDeleteResource?:  {
    __typename: "Resource",
    id: string,
    fullname: string,
    email: string,
    phoneNumber: string,
    category: string,
    subject: string,
    message: string,
    files?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt?: string | null,
  } | null,
};
