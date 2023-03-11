import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';

// const typeDefs = `#graphql
//     type Book {
//         title: String
//         author: String
//     }

//     type Query {
//         books: [Book]
//     }
// `;

// const books = [{ title: 'The Awakening', author: 'Stephen Fong' }];

// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// };

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventV2RequestHandler());
