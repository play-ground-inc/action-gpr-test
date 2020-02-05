import gql from 'graphql-tag';
import { createTestClient } from 'apollo-server-integration-testing';
import { bootstrapServer } from '../index';
import { seedTestDatabase } from './seed';

let server = null;
let conn = null;

beforeAll(async () => {
  const { apolloServer: createdServer, connection } = await bootstrapServer();

  server = createdServer;
  conn = connection;

  await seedTestDatabase();

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
    expect(data).toHaveLength(2);
  })
})
