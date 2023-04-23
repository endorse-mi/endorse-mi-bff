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
    content: {
      type: String,
      required: true,
      validate: (content: string) => {
        if (!content) {
          throw new Error('Content cannot be empty');
        }
        if (content.length > 20) {
          throw new Error('Content can only contain at most 20 characters');
        }
        return true;
      },
    },
    maxQuota: {
      type: Number,
      required: true,
      validate: (quota: number) => quota > 0,
    },
    remainingQuota: {
      type: Number,
      required: true,
      validate: (quota: number) => quota >= 0,
    },
    nConfirmed: {
      type: Number,
      required: true,
    },
    TTL: {
      type: Number,
      required: true,
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
