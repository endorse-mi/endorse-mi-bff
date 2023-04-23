import { PostType } from '../dynamodb/model/post-model';
import UserRepository from '../dynamodb/repository/user-repository';
import userService from './user-service';

export const INITIAL_BALANCE = 100;
export const ENDORSEMENT_POST_COST = -100;
export const RECOMMENDATION_POST_COST = -1000;
export const ENDORSEMENT_POST_AWARD = 25;
export const RECOMMENDATION_POST_AWARD = 500;

export default class BalanceService {
  private readonly userRepository = new UserRepository();

  changeUserBalance = async (userId: string, value: number) => {
    const userBalance = await userService.getUserBalanceById(userId);
    const newBalance = userBalance + value;
    if (newBalance < 0) {
      throw new Error(`User ${userId} doesn't have enough balance`);
    }

    await this.userRepository.updateUserBalance(userId, newBalance);
  };

  purchaseEndorsementPost = async (userId: string) => {
    await this.changeUserBalance(userId, ENDORSEMENT_POST_COST);
  };

  purchaseRecommendationPost = async (userId: string) => {
    await this.changeUserBalance(userId, RECOMMENDATION_POST_COST);
  };

  purchasePost = async (userId: string, type: PostType) => {
    type === PostType.ENDORSE ? await this.purchaseEndorsementPost(userId) : await this.purchaseRecommendationPost(userId);
  };

  rewardEndorsementPost = async (userId: string) => {
    await this.changeUserBalance(userId, ENDORSEMENT_POST_AWARD);
  };

  rewardRecommendationPost = async (userId: string) => {
    await this.changeUserBalance(userId, RECOMMENDATION_POST_AWARD);
  };

  rewardPost = async (userId: string, type: PostType) => {
    type === PostType.ENDORSE ? await this.rewardEndorsementPost(userId) : await this.rewardRecommendationPost(userId);
  };
}
