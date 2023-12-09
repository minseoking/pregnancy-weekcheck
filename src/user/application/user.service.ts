import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain/user.entity';
import { UserDto } from '../presentation/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserBySeq(seq: number) {
    return await this.getUser(seq);
  }

  async updateUser(seq: number, userDto: UserDto) {
    const user = await this.getUser(seq);
    if (userDto.nickname) {
      user.nickname = userDto.nickname;
    }
    if (userDto.dueDate) {
      user.dueDate = userDto.dueDate;
    }
    return this.userRepository.save(user);
  }

  private async getUser(seq: number) {
    const user = await this.userRepository.findOneBy({ seq: seq });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
