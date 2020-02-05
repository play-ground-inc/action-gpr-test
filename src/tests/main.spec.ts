import gql from 'graphql-tag';
import { createTestClient } from 'apollo-server-integration-testing';
import { bootstrapServer } from '../index';
import { seedTestDatabase } from './seed';

let server = null;
let conn = null;

let firstUser = null;

beforeAll(async () => {
  const { apolloServer: createdServer, connection } = await bootstrapServer();

  server = createdServer;
  conn = connection;

  await seedTestDatabase();

  // Testing querying inside before all

  const { query } = createTestClient({ apolloServer: server });
  
  const { data } = await query(gql`query{ users { email }}`);

  const [ user1 ] = data.users;
  firstUser = user1.email;

});

afterAll(async () => {
  await server.stop();
  await conn.close()
});

describe('Account', () => {
  it('Should Fetch Accounts', async () => {
    const { query } = createTestClient({ apolloServer: server});
    const TEST_QUERY = gql`
      query {
        users {
          id
          email
        }
      }
    `;

    const { data } = await query(TEST_QUERY);
    console.log(firstUser)
    expect(data.users).toHaveLength(2);
  })
})
