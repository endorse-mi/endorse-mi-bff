import { ApolloServer } from '@apollo/server';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { resolvers } from './resolver';
import { typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  // disable for prod
  introspection: true,
});

// createAPIGatewayProxyEventRequestHandler expects an event in the format used by the original version (i.e. RestApi) of API Gateway.
// createAPIGatewayProxyEventV2RequestHandler expects an event in the format used by the HttpApi version of Amazon API Gateway.
export const handler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventRequestHandler(), {
  middleware: [
    async (event) => {
      // console.log('event:', event);
    },
  ],
});
