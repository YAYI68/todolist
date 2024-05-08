import { ApolloServer } from "@apollo/server";
import "dotenv/config";
import typeDefs from "./types/index.js";
import resolvers from "./resolvers/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import connectDatabase from "./connection/database.js";
import serverlessExpress from '@vendia/serverless-express';

const { PORT } = process.env;

const app = express();
const httpServer = http.createServer(app);

const startServer = async () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });
  // await server.start();
  // app.use(
  //   "/",
  //   cors(),
  //   express.json(),
  //   expressMiddleware(server, {
  //     context: async ({ req }) => ({ token: req.headers.token })
  //   })
  // );

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

app.use( "/",cors(), express.json(), expressMiddleware(server));




  // await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  // console.log(`🚀 Server ready at http://localhost:${PORT}/`);
  // const { url } = await startStandaloneServer(server, {
  //   context: async ({ req }) => ({ token: req.headers.token }),
  //   // listen: { port: PORT },
  // });

  // console.log(`🚀  Server ready at: ${url}`);
};

connectDatabase(() => {
  console.log("database connected");
  startServer();
});
export const graphqlHandler = serverlessExpress({ app });
// export const handler = ServerlessHttp(httpServer)
// export const graphqlHandler = startServerAndCreateLambdaHandler(
//   server,
//   // We will be using the Proxy V2 handler
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// );