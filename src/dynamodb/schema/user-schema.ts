import { Schema } from 'dynamoose';

export const UserSchema = new Schema(
  {
    // hashKey is the partition key, whereas rangeKey is the sort key
    userId: {
      type: String,
      hashKey: true,
      required: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    givenName: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
      validate: (profile: string) => {
        if (!profile) {
          throw new Error('Linkedin profile URL cannot be empty');
        }
        if (!profile.startsWith('https://www.linkedin.com/in/')) {
          throw new Error('LinkedIn profile URL should start with https://www.linkedin.com/in/');
        }
        return true;
      },
    },
  },
  {
    // createdAt & updatedAt fields in ISO format are automatically generated
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
