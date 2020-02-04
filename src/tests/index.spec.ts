import gql from "graphql-tag";
import { createTestClient } from "apollo-server-testing";

import { bootstrapServer } from "../index";
import { seedTestDatabase } from "./seed";

let apolloServer = null;
let conn = null;

beforeAll(async () => {
  const { server: createdServer, connection } = await bootstrapServer();

  console.log('Inside before all');
  console.log(typeof createdServer);
  console.log(typeof connection);

  apolloServer = createdServer;
  conn = connection;

  const [ createdUser1, createdUser2 ] = await seedTestDatabase();

});

afterAll(async () => {
  // await apolloServer.stop();
  // console.log('Inside after all');

  // console.log(conn.dropDatabase);
  await conn.dropDatabase();

  await conn.close();
});

describe("User Resolver", () => {
  it("should register a new user successfully", async () => {
    const { query } = createTestClient(apolloServer);

    const REGISTER_USER = gql`
      query registerUser {
        users {
          email
        }
      }
    `;
    const { data } = await query({
      query: REGISTER_USER
    });

    expect(data.users).toHaveLength(2);
  });
});

// import gql from 'graphql-tag';
// import { createTestClient } from 'apollo-server-testing';
// import { bootstrapServer } from '../index';

// let server = null;
// let conn = null;

// beforeAll(async () => {
//   const { server: createdServer, connection } = await bootstrapServer();

//   server = createdServer;
//   conn = connection;
// });

// afterAll(async () => {
//   await server.stop();
//   // console.log(typeof server.stop)
//   await conn.dropDatabase();
//   await conn.close()
// });

// describe('Account', () => {
//   it('Should Fetch Accounts', async () => {
//     const { query } = createTestClient(server);
//     const TEST_QUERY = gql`
//       query {
//         users {
//           email
//         }
//       }
//     `;

//     const { data } = await query({ query: TEST_QUERY });
//     console.log(data)
//   })
// })
