import { DateTime, Post, User } from '../graphql';
import { UserModel } from '../users/users.model';

class PostModel implements Post {
  __typename: 'Post';
  id?: string;
  image?: string;
  text: string;
  user?: UserModel;
  createdAt?: DateTime;
  updatedAt?: DateTime;
}
