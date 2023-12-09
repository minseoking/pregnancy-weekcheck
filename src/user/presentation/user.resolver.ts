import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../application/user.service';
import { UserDto } from './dto/user.dto';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDto)
  async findUser(@Args('data') seq: number) {
    return await this.userService.getUserBySeq(seq);
  }
}
