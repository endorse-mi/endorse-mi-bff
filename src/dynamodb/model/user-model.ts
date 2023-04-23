import { Item } from 'dynamoose/dist/Item';

export class UserModel extends Item {
  userId: string;
  familyName: string;
  givenName: string;
  profile: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export type UserCreateRequest = {
  userId: string;
  familyName: string;
  givenName: string;
  profile: string;
};

export type UserUpdateRequest = {
  userId: string;
  familyName?: string;
  givenName?: string;
  profile?: string;
};
