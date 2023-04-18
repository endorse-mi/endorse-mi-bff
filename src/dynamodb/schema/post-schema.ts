import { Schema } from 'dynamoose';

const LINKEDIN_PROFILE_BASE_PATH = 'https://www.linkedin.com/in/';

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
      updatedAt: undefined,
    },
    validate: (user) => {
      if (!user.profile.beginsWith(LINKEDIN_PROFILE_BASE_PATH)) {
        throw new Error(`LinkedIn profile URL should start with ${LINKEDIN_PROFILE_BASE_PATH}`);
      }
      return true;
    },
  }
);
