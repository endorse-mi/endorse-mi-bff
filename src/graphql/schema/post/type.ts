export const postTypeSchema = `#graphql
    enum PostType {
        ENDORSE
        RECOMMEND
    }

    type Post {
        postId: String!
        userId: String!
        type: PostType!
        content: String
        maxQuota: Int!
        remainingQuota: Int!
    }

    type PostsScanResponse implements BaseResponse {
        success: Boolean!
        message: String!
        posts: [Post]!
    }

    input PostCreateRequest {
        userId: String!
        type: PostType!
        content: String
    }

    type PostCreateResponse implements BaseResponse {
        success: Boolean!
        message: String!
        post: Post
    }

    type PostDeleteResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }
`;
