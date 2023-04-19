import { ApolloServer } from '@apollo/server';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { resolvers } from './resolver';
import { typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

export const handler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventV2RequestHandler(), {
  middleware: [
    async (event) => {
      console.log('event:', event);
    },
  ],
});
