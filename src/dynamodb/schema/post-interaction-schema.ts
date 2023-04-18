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
        type: 'local',
      },
    },
    userId: {
      type: String,
      required: true,
      rangeKey: true,
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
        },
      },
    },
  }
);
