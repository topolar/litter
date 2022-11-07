
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UserInput {
    name: string;
    uid: string;
    roles?: Nullable<Nullable<string>[]>;
    image?: Nullable<string>;
    email?: Nullable<string>;
}

export interface PostInput {
    text: string;
    image?: Nullable<string>;
    userId?: Nullable<string>;
}

export interface MutationResponse {
    success: boolean;
    message?: Nullable<string>;
    code?: Nullable<string>;
}

export interface IQuery {
    __typename?: 'IQuery';
    posts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
    post(id: string): Nullable<Post> | Promise<Nullable<Post>>;
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    userByUid(uid?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export interface Post {
    __typename?: 'Post';
    id?: Nullable<string>;
    text: string;
    image?: Nullable<string>;
    user?: Nullable<User>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export interface User {
    __typename?: 'User';
    id?: Nullable<string>;
    uid: string;
    roles?: Nullable<Nullable<string>[]>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    image?: Nullable<string>;
}

export interface PostMutationResponse extends MutationResponse {
    __typename?: 'PostMutationResponse';
    success: boolean;
    message?: Nullable<string>;
    code?: Nullable<string>;
    post?: Nullable<Post>;
}

export interface UserMutationResponse extends MutationResponse {
    __typename?: 'UserMutationResponse';
    success: boolean;
    message?: Nullable<string>;
    code?: Nullable<string>;
    user?: Nullable<User>;
}

export interface IMutation {
    __typename?: 'IMutation';
    addPost(input?: Nullable<PostInput>): Nullable<PostMutationResponse> | Promise<Nullable<PostMutationResponse>>;
    updatePost(id: string, input?: Nullable<PostInput>): Nullable<PostMutationResponse> | Promise<Nullable<PostMutationResponse>>;
    deletePost(id: string): Nullable<PostMutationResponse> | Promise<Nullable<PostMutationResponse>>;
    addUser(input?: Nullable<UserInput>): Nullable<UserMutationResponse> | Promise<Nullable<UserMutationResponse>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
