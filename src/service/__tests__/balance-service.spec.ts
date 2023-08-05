import { describe, expect, it } from 'vitest';
import userRepository from '../../dynamodb/repository/user-repository';
import balanceService from '../balance-service';

vi.mock('../user-service', () => {
  return {
    default: {
      getUserBalanceById: vi.fn().mockReturnValue(100),
    },
  };
});

vi.mock('../../dynamodb/repository/user-repository');

describe('balance-service', () => {
  it('should change user balance', async () => {
    await balanceService.changeUserBalance('user-id', 30);
    expect(userRepository.updateUserBalance).toBeCalledWith('user-id', 130);
  });
});
