export const postTypeSchema = `#graphql
    enum PostType {
        ENDORSE
        RECOMMEND
    }

    type Post {
        postId: ID!
        userId: ID!
        type: PostType!
        content: String!
        maxQuota: Int!
        remainingQuota: Int!
        author: User!
    }

    type PostsResponse implements BaseResponse {
        posts: [Post]!
        success: Boolean!
        message: String!
    }

    input PostCreateRequest {
        userId: ID!
        type: PostType!
        content: String!
    }

    type PostResponse implements BaseResponse {
        post: Post!
        success: Boolean!
        message: String!
    }

    type PostBaseResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }
`;
