import { describe, expect, it } from 'vitest';
import { PostType } from '../../dynamodb/model/post-model';
import userRepository from '../../dynamodb/repository/user-repository';
import { USER_ID } from '../../__tests__/fixture';
import balanceService, {
  ENDORSEMENT_POST_AWARD,
  ENDORSEMENT_POST_COST,
  RECOMMENDATION_POST_AWARD,
  RECOMMENDATION_POST_COST,
} from '../balance-service';
import userService from '../user-service';

vi.mock('../user-service', () => ({
  default: {
    getUserBalanceById: vi.fn().mockReturnValue(100),
  },
}));

vi.mock('../../dynamodb/repository/user-repository');

describe('balance-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('changeUserBalance', () => {
    it('should add user balance', async () => {
      await balanceService.changeUserBalance(USER_ID, 30);

      expect(userRepository.updateUserBalance).toBeCalledWith(USER_ID, 130);
    });

    it('should reduce user balance', async () => {
      await balanceService.changeUserBalance(USER_ID, -30);

      expect(userRepository.updateUserBalance).toBeCalledWith(USER_ID, 70);
    });

    it('should throw error if user does not have enough balance', async () => {
      await expect(balanceService.changeUserBalance(USER_ID, -150)).rejects.toThrow(`User ${USER_ID} doesn't have enough balance`);
      await expect(userRepository.updateUserBalance).not.toBeCalled();
    });
  });

  describe('purchaseEndorsementPost', () => {
    it('should reduce user balance', async () => {
      vi.spyOn(balanceService, 'changeUserBalance');
      await balanceService.purchaseEndorsementPost(USER_ID);

      expect(balanceService.changeUserBalance).toBeCalledWith(USER_ID, ENDORSEMENT_POST_COST);
    });

    it('should throw error if user does not have enough balance', async () => {
      vi.spyOn(userService, 'getUserBalanceById').mockResolvedValueOnce(50);
      await expect(balanceService.purchaseEndorsementPost(USER_ID)).rejects.toThrow(`User ${USER_ID} doesn't have enough balance`);
    });
  });

  describe('purchaseRecommendationPost', () => {
    it('should reduce user balance', async () => {
      vi.spyOn(balanceService, 'changeUserBalance');
      vi.spyOn(userService, 'getUserBalanceById').mockResolvedValueOnce(1000);
      await balanceService.purchaseRecommendationPost(USER_ID);

      expect(balanceService.changeUserBalance).toBeCalledWith(USER_ID, RECOMMENDATION_POST_COST);
    });

    it('should throw error if user does not have enough balance', async () => {
      await expect(balanceService.purchaseRecommendationPost(USER_ID)).rejects.toThrow(`User ${USER_ID} doesn't have enough balance`);
    });
  });

  describe('purchasePost', () => {
    it('should purchase endorsement post', async () => {
      vi.spyOn(balanceService, 'purchaseEndorsementPost');
      await balanceService.purchasePost(USER_ID, PostType.ENDORSE);

      expect(balanceService.purchaseEndorsementPost).toBeCalled();
    });

    it('should purchase recommendation post', async () => {
      vi.spyOn(balanceService, 'purchaseRecommendationPost');
      vi.spyOn(userService, 'getUserBalanceById').mockResolvedValueOnce(1000);
      await balanceService.purchasePost(USER_ID, PostType.RECOMMEND);

      expect(balanceService.purchaseRecommendationPost).toBeCalled();
    });
  });

  describe('rewardEndorsementPost', () => {
    it('should reward endorsement post', async () => {
      vi.spyOn(balanceService, 'changeUserBalance');
      await balanceService.rewardEndorsementPost(USER_ID);

      expect(balanceService.changeUserBalance).toBeCalledWith(USER_ID, ENDORSEMENT_POST_AWARD);
    });
  });

  describe('rewardRecommendationPost', () => {
    it('should reward recommendation post', async () => {
      vi.spyOn(balanceService, 'changeUserBalance');
      await balanceService.rewardRecommendationPost(USER_ID);

      expect(balanceService.changeUserBalance).toBeCalledWith(USER_ID, RECOMMENDATION_POST_AWARD);
    });
  });

  describe('rewardPost', () => {
    it('should reward endorsement post', async () => {
      vi.spyOn(balanceService, 'rewardEndorsementPost');
      await balanceService.rewardPost(USER_ID, PostType.ENDORSE);

      expect(balanceService.rewardEndorsementPost).toBeCalled();
    });

    it('should reward recommendation post', async () => {
      vi.spyOn(balanceService, 'rewardRecommendationPost');
      vi.spyOn(userService, 'getUserBalanceById').mockResolvedValueOnce(1000);
      await balanceService.rewardPost(USER_ID, PostType.RECOMMEND);

      expect(balanceService.rewardRecommendationPost).toBeCalled();
    });
  });
});
