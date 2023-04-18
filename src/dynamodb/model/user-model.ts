import { Item } from 'dynamoose/dist/Item';

export class UserModel extends Item {
  userId = '';
  familyName = '';
  givenName = '';
  profile = '';
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
