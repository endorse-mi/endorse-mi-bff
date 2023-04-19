export const postTypeSchema = `#graphql
    enum PostType {
        ENDORSE
        RECOMMEND
    }

    type Post {
        userId: String!
        type: PostType!
        skill: String
    }

    input CreatePostRequest {
        userId: String!
        type: PostType!
        skill: String
    }

    type CreatePostResponse implements BaseResponse {
        success: Boolean!
        message: String!
        post: Post
    }

    type DeletePostResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }
`;
