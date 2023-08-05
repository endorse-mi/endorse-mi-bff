import { PostType } from '../../dynamodb/model/post-model';
import postRepository from '../../dynamodb/repository/post-repository';
import { POST_ID, USER_ID, UTC_TIME } from '../../__tests__/fixture';
import postService, { ENDORSEMENT_POST_QUOTA, RECOMMENDATION_POST_QUOTA } from '../post-service';

vi.mock('dayjs');
vi.mock('uuid', () => ({
  v4: vi.fn().mockReturnValue(POST_ID),
}));
vi.mock('../balance-service');
vi.mock('../../dynamodb/repository/post-repository');

describe('post-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPosts', () => {
    it('should get posts', async () => {
      await postService.getPosts(PostType.ENDORSE);

      expect(postRepository.getPosts).toBeCalledWith(PostType.ENDORSE, undefined);

      const startKey = {
        postId: POST_ID,
        type: PostType.ENDORSE,
        createdAt: '2023-08-02T12:53:04.145Z',
      };
      await postService.getPosts(PostType.ENDORSE, startKey);

      expect(postRepository.getPosts).toBeCalledWith(PostType.ENDORSE, startKey);
    });
  });

  describe('getPostById', () => {
    it('should get post by id', async () => {
      await postService.getPostById(POST_ID);

      expect(postRepository.getPostById).toBeCalledWith(POST_ID);
    });
  });

  describe('getPostsByAuthorId', () => {
    it('should get posts by author id', async () => {
      await postService.getPostsByAuthorId(USER_ID);

      expect(postRepository.getPostsByAuthorId).toBeCalledWith(USER_ID);
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const endorseRequest = {
        authorId: USER_ID,
        type: PostType.ENDORSE,
        content: '',
      };
      await postService.createPost(endorseRequest);

      expect(postRepository.createPost).toBeCalledWith({
        TTL: new Date(UTC_TIME).getTime() / 1000,
        maxQuota: ENDORSEMENT_POST_QUOTA,
        nConfirmed: 0,
        remainingQuota: ENDORSEMENT_POST_QUOTA,
        postId: POST_ID,
        ...endorseRequest,
      });

      const recommendRequest = {
        authorId: USER_ID,
        type: PostType.RECOMMEND,
        content: '',
      };
      await postService.createPost(recommendRequest);

      expect(postRepository.createPost).toBeCalledWith({
        TTL: new Date(UTC_TIME).getTime() / 1000,
        maxQuota: RECOMMENDATION_POST_QUOTA,
        nConfirmed: 0,
        remainingQuota: RECOMMENDATION_POST_QUOTA,
        postId: POST_ID,
        ...recommendRequest,
      });
    });
  });

  describe('deletePost', () => {
    it('should delete post by id', async () => {
      await postService.deletePost(POST_ID);

      expect(postRepository.deletePost).toBeCalledWith(POST_ID);
    });
  });
});
