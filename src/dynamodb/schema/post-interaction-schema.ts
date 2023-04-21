import { Schema } from 'dynamoose';

export const PostInteractionSchema = new Schema(
  {
    postId: {
      type: String,
      hashKey: true,
      required: true,
      index: {
        name: 'state-index',
        rangeKey: 'state',
      },
    },
    userId: {
      type: String,
      required: true,
      rangeKey: true,
    },
    state: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: {
        createdAt: {
          type: {
            value: Date,
            settings: {
              storage: 'iso',
            },
          },
          get: (value: string) => new Date(value).toISOString(),
        },
      },
      updatedAt: {
        updatedAt: {
          type: {
            value: Date,
            settings: {
              storage: 'iso',
            },
          },
          get: (value: string) => new Date(value).toISOString(),
        },
      },
    },
  }
);
