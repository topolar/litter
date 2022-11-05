/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query getAllPosts {\n    posts {\n      id\n      text\n      image\n      createdAt\n      user {\n        id\n        name\n      }\n    }\n  }\n": types.GetAllPostsDocument,
    "\n  mutation deletePost($id:ID!) {\n    deletePost(id: $id) {\n      success\n    }\n  }\n": types.DeletePostDocument,
    "\n  mutation addPost($input:PostInput!) {\n    addPost(input:$input ) {\n      success\n    }\n  }\n": types.AddPostDocument,
    "\n    query getPost($id:ID!) {\n        post(id: $id) {\n            id\n            text\n            image\n            user {\n                id\n                name\n            }\n        }\n    }\n": types.GetPostDocument,
};

export function graphql(source: "\n  query getAllPosts {\n    posts {\n      id\n      text\n      image\n      createdAt\n      user {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAllPosts {\n    posts {\n      id\n      text\n      image\n      createdAt\n      user {\n        id\n        name\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation deletePost($id:ID!) {\n    deletePost(id: $id) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation deletePost($id:ID!) {\n    deletePost(id: $id) {\n      success\n    }\n  }\n"];
export function graphql(source: "\n  mutation addPost($input:PostInput!) {\n    addPost(input:$input ) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation addPost($input:PostInput!) {\n    addPost(input:$input ) {\n      success\n    }\n  }\n"];
export function graphql(source: "\n    query getPost($id:ID!) {\n        post(id: $id) {\n            id\n            text\n            image\n            user {\n                id\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query getPost($id:ID!) {\n        post(id: $id) {\n            id\n            text\n            image\n            user {\n                id\n                name\n            }\n        }\n    }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;