import { ApolloServer } from '@apollo/server';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { ENVIRONMENT } from '../environments';
import { resolvers } from './resolver';
import { typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  introspection: ENVIRONMENT !== 'prod',
  plugins: [
    {
      async requestDidStart() {
        return {
          async willSendResponse(requestContext) {
            const { response } = requestContext;
            response.http.headers.set('Access-Control-Allow-Methods', '*');
            response.http.headers.set('Access-Control-Allow-Origin', '*');
          },
        };
      },
    },
  ],
});

// createAPIGatewayProxyEventRequestHandler expects an event in the format used by the original version (i.e. RestApi) of API Gateway.
// createAPIGatewayProxyEventV2RequestHandler expects an event in the format used by the HttpApi version of Amazon API Gateway.
export const handler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventRequestHandler(), {
  context: async ({ event }) => {
    return {
      // claims: {
      //   sub: 'd5ea9b25-8bf4-4fb5-ac26-1adaff36a363',
      //   email_verified: 'true',
      //   iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_KIHMSNLAY',
      //   'cognito:username': 'd5ea9b25-8bf4-4fb5-ac26-1adaff36a363',
      //   origin_jti: '1bd61133-10d7-4ffc-9476-305a2e80759c',
      //   aud: '6s0jgosqonq2k57gm6pftsv2td',
      //   event_id: '6e6df579-4cfc-4eef-8a6e-4c8342ea1157',
      //   token_use: 'id',
      //   auth_time: '1682123876',
      //   exp: 'Sat Apr 22 01:37:56 UTC 2023',
      //   iat: 'Sat Apr 22 00:37:56 UTC 2023',
      //   jti: 'f435762c-8afa-4a72-b0d8-f91579badcd3',
      //   email: 'fongchinghinstephen@gmail.com'
      // }
      userId: event.requestContext.authorizer?.claims?.email,
    };
  },
});
