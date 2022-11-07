import { User } from 'src/graphql';

export class UserModel implements User {
  email?: string;
  id?: string;
  image?: string;
  name?: string;
  roles?: string[];
  uid: string;
}
