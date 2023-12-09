import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../application/user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDto)
  async findUser(@Args('seq') seq: number) {
    return await this.userService.getUserBySeq(seq);
  }

  @Mutation(() => UserDto)
  async updateUser(@Args('updateUser') userDto: UpdateUserInput) {
    return await this.userService.updateUser(userDto.seq, userDto);
  }
}
