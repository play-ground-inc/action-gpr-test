import { Resolver, Query } from 'type-graphql';
import { User } from '../entity/User';

@Resolver(User)
class UserResolver {
  @Query(returns => [User])
  async users() {
    return await User.find();
  }
}