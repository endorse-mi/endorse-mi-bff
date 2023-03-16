import { ApolloServer } from '@apollo/server';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';

import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Amplify, Auth } from 'aws-amplify';

const poolData = {
  UserPoolId: 'us-east-1_t7v4IF9Z4',
  ClientId: '10trqqeek3pr7kmokan7uu9tgo',
};

export const userPool = new CognitoUserPool(poolData);

Amplify.configure({
  Auth: {
    userPoolId: 'us-east-1_t7v4IF9Z4',
    userPoolWebClientId: '10trqqeek3pr7kmokan7uu9tgo',
  },
});

Auth.configure();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventV2RequestHandler());
