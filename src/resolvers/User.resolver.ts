import { Resolver, Query, Arg, FieldResolver, Root, UseMiddleware } from 'type-graphql';
import { User } from '../entity/User';
import { ApolloError } from 'apollo-server-express';

@Resolver(User)
class UserResolver {
  @Query(returns => [User])
  async users() {
    const user = await User.find();

    if (!user) {
      throw new ApolloError("User Not Found");
    }

    return user;
  }
}