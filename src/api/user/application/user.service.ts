import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain/user.entity';
import { UserDto } from '../dto/user.dto';
import { UpdateUserInput } from '../dto/update-user.input';
import { calculatePregnancyWeek } from '../../../global/util/date.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserBySeq(seq: number) {
    return this.toUserDto(await this.getUser(seq));
  }

  async updateUser(seq: number, userDto: UpdateUserInput) {
    const user = await this.getUser(seq);
    user.update(userDto.nickname, userDto.dueDate);

    await this.userRepository.save(user);
    return 'success';
  }

  private async getUser(seq: number) {
    const user = await this.userRepository.findOneBy({ seq: seq });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private toUserDto(userEntity: UserEntity): UserDto {
    const userDto = new UserDto();
    userDto.seq = userEntity.seq;
    userDto.nickname = userEntity.nickname;
    userDto.dueDate = userEntity.dueDate;
    userDto.pregnancyWeek = userEntity.getPregnancyWeek();

    return userDto;
  }
}
