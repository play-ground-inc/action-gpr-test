import gql from "graphql-tag";
import { createTestClient } from "apollo-server-integration-testing";

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
  await conn.dropDatabase();
  await conn.close();
});

describe("User Resolver", () => {
  it("should register a new user successfully", async () => {
    const { query } = createTestClient( { apolloServer });

    const REGISTER_USER = gql`
      query registerUser {
        users {
          email
        }
      }
    `;
    // const { data } = await query({
    //   query: REGISTER_USER
    // });

    const { data } = await query(REGISTER_USER);
    expect(data.users).toHaveLength(2);
  });
});
