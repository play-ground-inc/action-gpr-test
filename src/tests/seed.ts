import { User } from "../entity/User";

export const seedTestDatabase = async () => {
  const user1 = new User();
  user1.email = 'user1@gmail.com';
  await user1.save();

  const user2 = new User();
  user2.email = 'testdb@tsadf.com';

  await user2.save();

  return [user1, user2];
};