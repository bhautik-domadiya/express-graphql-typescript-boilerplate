import 'reflect-metadata'
import { ApolloServer, } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql'
import http from 'http';
import { rootResolver } from './graphql/resolvers';
import { connect } from 'mongoose';
import { DEFAULT_CONFIG } from './config';

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: rootResolver,
    emitSchemaFile: true,
  })

  await connect(DEFAULT_CONFIG.MONGODB_URL).then(() => {
    console.log('MongoDB Server Started!....')
  }).catch((error) => {
    console.log(error);
  });
  
  const server = new ApolloServer({schema});
  await server.start();

  server.applyMiddleware({ app });
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();