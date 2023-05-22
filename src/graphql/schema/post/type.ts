export const postTypeSchema = `#graphql
    enum PostType {
        ENDORSE
        RECOMMEND
    }

    type Post {
        postId: ID!
        authorId: ID!
        type: PostType!
        content: String!
        maxQuota: Int!
        remainingQuota: Int!
        createdAt: String!
        author: User!
    }

    type PostsResponse implements BaseResponse {
        posts: [Post!]!
        success: Boolean!
        message: String!
    }

    input PostsGetInput {
        type: PostType!
        startKey: String
    }

    input PostCreateInput {
        type: PostType!
        content: String!
    }

    type PostResponse implements BaseResponse {
        post: Post
        success: Boolean!
        message: String!
    }
`;
