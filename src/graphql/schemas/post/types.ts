export const postTypeSchema = `#graphql
    enum PostType {
        ENDORSEMENT
        RECOMMENDATION
    }

    type Post {
        userId: String!
        postId: String!
        createdAt: String!
        type: PostType!
        content: String!
    }

    input AddPostRequest {
        userId: String!
        createdAt: String!
        type: PostType
        content: String!
    }

    type AddPostResponse implements BaseResponse {
        success: Boolean!
        message: String!
        post: Post
    }
`;
