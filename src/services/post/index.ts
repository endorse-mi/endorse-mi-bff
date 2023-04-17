import { DynamoDBClient, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: 'us-east-1',
});

const params = {
  TableName: 'posts',
  Key: {
    userId: {
      S: 'fake-uuid',
    },
    createdAt: {
      N: '134124',
    },
  },
};

export const getPost = async () => {
  const command = new GetItemCommand(params);
  const { Item } = await client.send(command);
  return {
    success: true,
    message: `Got post`,
    post: {
      userId: Item?.userId.S,
      postId: Item?.postId.S,
      createdAt: Item?.createdAt.N,
      type: Item?.type.S,
      content: Item?.content.S,
    },
  };
};

export const getPostsByUserId = async (userId: string) => {
  const params = {
    TableName: 'posts',
    KeyConditionExpression: 'userId = :id',
    ExpressionAttributeValues: {
      ':id': { S: userId },
    },
  };
  const response = await client.send(new QueryCommand(params));
  return response.Items;
};
