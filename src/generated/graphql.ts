import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
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

export type AuthorizeResponse = UserNotFound | UserWithToken;

export type BadInput = {
  __typename?: 'BadInput';
  message?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
};

export type CreateMediaInput = {
  caption?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type?: Maybe<MediaType>;
  url: Scalars['String'];
};

export type CreatePostInput = {
  body?: Maybe<Scalars['String']>;
  media?: Maybe<Array<Maybe<CreateMediaInput>>>;
  title: Scalars['String'];
};

export type CreatePostResponse = BadInput | Post | Unauthorized;

export type CreateUserResponse = BadInput | Unauthorized | User;

export type GetUploadSignedUrlInput = {
  fileName: Scalars['String'];
};

export type Media = {
  __typename?: 'Media';
  caption?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export enum MediaType {
  Image = 'IMAGE'
}

export type Mutation = {
  __typename?: 'Mutation';
  authorize?: Maybe<AuthorizeResponse>;
  createPost?: Maybe<CreatePostResponse>;
  createUser?: Maybe<CreateUserResponse>;
};


export type MutationAuthorizeArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateUserArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
  roleName: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  contributors?: Maybe<Array<Maybe<User>>>;
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  encryptTest: Scalars['String'];
  getRoles: Array<Maybe<Role>>;
  getUploadSignedUrl: Scalars['String'];
  getUserById: User;
};


export type QueryEncryptTestArgs = {
  text: Scalars['String'];
};


export type QueryGetUploadSignedUrlArgs = {
  input: GetUploadSignedUrlInput;
};

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  role?: Maybe<Role>;
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

export type GetUploadSignedUrlQueryVariables = Exact<{
  input: GetUploadSignedUrlInput;
}>;


export type GetUploadSignedUrlQuery = { __typename?: 'Query', getUploadSignedUrl: string };

export const GetUploadSignedUrlDocument = gql`
    query getUploadSignedUrl($input: GetUploadSignedUrlInput!) {
  getUploadSignedUrl(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUploadSignedUrlGQL extends Apollo.Query<GetUploadSignedUrlQuery, GetUploadSignedUrlQueryVariables> {
    document = GetUploadSignedUrlDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }