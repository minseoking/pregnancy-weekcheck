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

  @Mutation(() => String)
  async updateUser(@Args('updateUser') userInput: UpdateUserInput) {
    return await this.userService.updateUser(userInput.seq, userInput);
  }
}
