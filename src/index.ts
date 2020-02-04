import "reflect-metadata";

import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import express from 'express';
import bodyParser from 'body-parser';
import { User } from "./entity/User";




export const bootstrapServer = async () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    const conn = await createConnection();

    const schema = await buildSchema({
        resolvers: [__dirname + "/**/*.resolver.ts"],
    });

    const server = new ApolloServer({
        schema,
        playground: true,
    });

    server.applyMiddleware({ app });

    return { app, server, connection: conn };
}

if (require.main === module) {
  bootstrapServer()
    .then(async ({ app }) => {
      // Start the server
      app.listen(4000, () => {
          console.log(`Server is running on port 4000, GraphQL Playground available at /graphql`);
      });
    })
    .catch((err) => console.error(err));
}


// export const bootstrapServer = async () => {
//       const app = express();

//     app.use(bodyParser.urlencoded({ extended: false }))
//     app.use(bodyParser.json())
//   const conn = await createConnection();

//   const schema = await buildSchema({
//       resolvers: [__dirname + "/**/*.resolver.ts"],
//       validate: false,
//   });

//   const server = new ApolloServer({
//       schema,
//       playground: true,
//     });

//     // server.applyMiddleware({ app })
//   return { app, server, connection: conn };
// };

// if (require.main === module) {
//   bootstrapServer().then(async ({ app, server }) => {
//       // Start the server
//       //  app.listen(4000, () => {
//       //     console.log(`Server is running, GraphQL Playground available at 4000`);
//       //  });
//        const { url } = await server.listen(4000);
//         console.log(`Server is running, GraphQL Playground available at ${url}`);
//   });
// }

// const seed = async () => {

//   const user1 = new User();
//   user1.email = 'user1@gmail.com';
//   await user1.save();

//   const user2 = new User();
//   user2.email = 'testdb@tsadf.com';

//   await user2.save();
// };
// // seed();