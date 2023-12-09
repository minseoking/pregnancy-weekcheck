import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserBySeq(seq: number) {
    const user = await this.userRepository.findOneBy({ seq: seq });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
