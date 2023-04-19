import { Schema } from 'dynamoose';

export const PostSchema = new Schema(
  {
    postId: {
      type: String,
      hashKey: true,
      required: true,
    },
    userId: {
      type: String,
      index: {
        name: 'userId-index',
        type: 'global',
        rangeKey: 'createdAt',
      },
    },
    type: {
      type: String,
      required: true,
      enum: ['ENDORSE', 'RECOMMEND'],
    },
    skill: {
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
      updatedAt: undefined,
    },
  }
);
