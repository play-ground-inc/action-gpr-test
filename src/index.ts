import "reflect-metadata";

import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import bodyParser from 'body-parser';


const API_PORT = 4000;

export const bootstrapServer = async () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    const conn = await createConnection();


    const schema = await buildSchema({
        resolvers: [__dirname + "/**/*.resolver.ts"],
    });

    const apolloServer = new ApolloServer({
        schema,
        playground: true,
    });

    apolloServer.applyMiddleware({ app });

    return { app, apolloServer, connection: conn };
};

if (require.main === module) {
    bootstrapServer()
      .then(async ({ app }) => {
        // Start the server
        app.listen(API_PORT, () => {
            console.log(`Server is running on port ${API_PORT}, GraphQL Playground available at /graphql`);
        });
      })
      .catch((err) => console.error(err));
}
