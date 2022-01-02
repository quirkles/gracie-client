import {gql} from 'apollo-angular';
import {Injectable} from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthorizeResponse = ServerError | UserNotFound | UserWithToken;

export type BadInput = {
  __typename?: 'BadInput';
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
};

export type CreateUserResponse = BadInput | ServerError | Unauthorized | User;

export type Edge = {
  __typename?: 'Edge';
  node?: Maybe<Post>;
};

export type GetUploadSignedUrlInput = {
  fileName: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  caption?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type: MediaType;
  url: Scalars['String'];
};

export enum MediaType {
  Image = 'IMAGE'
}

export type Mutation = {
  __typename?: 'Mutation';
  authorize?: Maybe<AuthorizeResponse>;
  createUser?: Maybe<CreateUserResponse>;
  savePost?: Maybe<SavePostResponse>;
};


export type MutationAuthorizeArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
  roleName: Scalars['String'];
};


export type MutationSavePostArgs = {
  input: SavePostInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  contributors?: Maybe<Array<User>>;
  date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  media?: Maybe<Array<Media>>;
  title?: Maybe<Scalars['String']>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges: Array<Maybe<Edge>>;
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  encryptTest: Scalars['String'];
  getPostConnection: PostConnection;
  getRoles: Array<Maybe<RoleType>>;
  getUploadSignedUrl: Scalars['String'];
  validateToken: Scalars['Boolean'];
};


export type QueryEncryptTestArgs = {
  text: Scalars['String'];
};


export type QueryGetUploadSignedUrlArgs = {
  input: GetUploadSignedUrlInput;
};


export type QueryValidateTokenArgs = {
  token: Scalars['String'];
};

export enum RoleType {
  Auntie = 'AUNTIE',
  Dad = 'DAD',
  Friend = 'FRIEND',
  Granddad = 'GRANDDAD',
  Grandma = 'GRANDMA',
  Me = 'ME',
  Mum = 'MUM',
  NoRelation = 'NO_RELATION',
  Uncle = 'UNCLE'
}

export type SaveMediaInput = {
  caption?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type: MediaType;
  url: Scalars['String'];
};

export type SavePostInput = {
  body?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  media?: Maybe<Array<SaveMediaInput>>;
  title: Scalars['String'];
};

export type SavePostResponse = BadInput | Post | ServerError | Unauthorized;

export type ServerError = {
  __typename?: 'ServerError';
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
};

export type Unauthorized = {
  __typename?: 'Unauthorized';
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

export type UserNotFound = {
  __typename?: 'UserNotFound';
  message?: Maybe<Scalars['String']>;
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type AuthorizeMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthorizeMutation = { __typename?: 'Mutation', authorize?: Maybe<{ __typename?: 'ServerError', message?: Maybe<string>, reason?: Maybe<string> } | { __typename?: 'UserNotFound', message?: Maybe<string> } | { __typename?: 'UserWithToken', token?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id?: Maybe<string> }> }> };

export type GetUploadSignedUrlQueryVariables = Exact<{
  input: GetUploadSignedUrlInput;
}>;


export type GetUploadSignedUrlQuery = { __typename?: 'Query', getUploadSignedUrl: string };

export type SavePostMutationVariables = Exact<{
  input: SavePostInput;
}>;


export type SavePostMutation = { __typename?: 'Mutation', savePost?: Maybe<{ __typename?: 'BadInput', message?: Maybe<string>, reason?: Maybe<string> } | { __typename?: 'Post', id?: Maybe<string>, title?: Maybe<string>, body?: Maybe<string>, contributors?: Maybe<Array<{ __typename?: 'User', role?: Maybe<string>, id?: Maybe<string>, name?: Maybe<string> }>>, media?: Maybe<Array<{ __typename?: 'Media', id?: Maybe<string>, title?: Maybe<string>, caption?: Maybe<string>, type: MediaType, url: string }>> } | { __typename?: 'ServerError', message?: Maybe<string>, reason?: Maybe<string> } | { __typename?: 'Unauthorized', message?: Maybe<string>, reason?: Maybe<string> }> };

export type ValidateTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidateTokenQuery = { __typename?: 'Query', validateToken: boolean };

export const AuthorizeDocument = gql`
    mutation authorize($name: String!, $password: String!) {
  authorize(name: $name, password: $password) {
    ... on UserWithToken {
      user {
        id
      }
      token
    }
    ... on UserNotFound {
      message
    }
    ... on ServerError {
      message
      reason
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root',
  })
export class AuthorizeGQL extends Apollo.Mutation<AuthorizeMutation, AuthorizeMutationVariables> {
    document = AuthorizeDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
}
export const GetUploadSignedUrlDocument = gql`
    query getUploadSignedUrl($input: GetUploadSignedUrlInput!) {
  getUploadSignedUrl(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root',
  })
export class GetUploadSignedUrlGQL extends Apollo.Query<GetUploadSignedUrlQuery, GetUploadSignedUrlQueryVariables> {
    document = GetUploadSignedUrlDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
}
export const SavePostDocument = gql`
    mutation savePost($input: SavePostInput!) {
  savePost(input: $input) {
    ... on Post {
      id
      title
      body
      contributors {
        role
        id
        name
      }
      media {
        id
        title
        caption
        type
        url
      }
    }
    ... on BadInput {
      message
      reason
    }
    ... on Unauthorized {
      message
      reason
    }
    ... on ServerError {
      message
      reason
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root',
  })
export class SavePostGQL extends Apollo.Mutation<SavePostMutation, SavePostMutationVariables> {
    document = SavePostDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
}
export const ValidateTokenDocument = gql`
    query validateToken($token: String!) {
  validateToken(token: $token)
}
    `;

  @Injectable({
    providedIn: 'root',
  })
export class ValidateTokenGQL extends Apollo.Query<ValidateTokenQuery, ValidateTokenQueryVariables> {
    document = ValidateTokenDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
}
