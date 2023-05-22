import { Item } from 'dynamoose/dist/Item';

export class UserModel extends Item {
  userId: string;
  familyName: string;
  givenName: string;
  profile: string;
  headline: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export type UserCreateInput = {
  userId: string;
  familyName: string;
  givenName: string;
  profile: string;
};

export type UserUpdateInput = {
  userId: string;
  familyName?: string;
  givenName?: string;
  profile?: string;
  headline?: string;
};
