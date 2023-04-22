import UserRepository from '../dynamodb/repository/user-repository';
import userService from './user-service';

export const INITIAL_BALANCE = 100;
export const COST_PER_ENDORSEMENT_POST = -100;
export const COST_PER_RECOMMENDATION_POST = -1000;
export const AWARD_PER_CONFIRMED_ENDORSEMENT = 25;
export const AWARD_PER_CONFIRMED_RECOMMENDATION = 500;

const userRepository = new UserRepository();

const changeUserBalance = async (userId: string, value: number) => {
  const userBalance = await userService.getUserBalanceById(userId);
  const newBalance = userBalance + value;
  if (newBalance < 0) {
    throw new Error(`User ${userId} doesn't have enough balance`);
  }

  await userRepository.updateUserBalance(userId, newBalance);
};

export default {
  changeUserBalance,
};
