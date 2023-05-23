export const postTypeSchema = `#graphql
    enum PostType {
        ENDORSE
        RECOMMEND
    }

    input PostLastKey {
        postId: String!
        type: PostType!
        createdAt: String!
    }

    type PostKey {
        postId: String!
        type: PostType!
        createdAt: String!
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
        lastKey: PostKey
        success: Boolean!
        message: String!
    }

    input PostsGetInput {
        type: PostType!
        startKey: PostLastKey
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
