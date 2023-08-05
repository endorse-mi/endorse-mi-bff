import userRepository from '../../dynamodb/repository/user-repository';
import { FAMILY_NAME, GIVEN_NAME, PROFILE, USER_ID } from '../../__tests__/fixture';
import cognitoService from '../cognito-service';
import userService from '../user-service';

vi.mock('../cognito-service');
vi.mock('../../dynamodb/repository/user-repository');

describe('user-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should get user by id', async () => {
      await userService.getUserById(USER_ID);

      expect(userRepository.getUserById).toBeCalledWith(USER_ID);
    });
  });

  describe('getUserBalanceById', () => {
    it('should get user balance by id', async () => {
      await userService.getUserBalanceById(USER_ID);

      expect(userRepository.getUserBalanceById).toBeCalledWith(USER_ID);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const request = {
        userId: USER_ID,
        familyName: FAMILY_NAME,
        givenName: GIVEN_NAME,
        profile: PROFILE,
      };
      await userService.createUser(request);

      expect(userRepository.createUser).toBeCalledWith(request);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const request = {
        userId: USER_ID,
        familyName: FAMILY_NAME,
        givenName: GIVEN_NAME,
        profile: PROFILE,
        headline: 'Software Engineer',
      };
      await userService.updateUser(request);

      expect(userRepository.updateUser).toBeCalledWith(request);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      await userService.deleteUser(USER_ID);

      expect(cognitoService.deleteUser).toBeCalledWith(USER_ID);
      expect(userRepository.deleteUser).toBeCalledWith(USER_ID);
    });
  });
});
