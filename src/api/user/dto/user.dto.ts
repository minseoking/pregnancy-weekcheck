import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../domain/user.entity';

@ObjectType()
export class UserDto {
  @Field()
  seq: number;

  @Field()
  nickname: string;

  @Field()
  dueDate: string;

  @Field()
  pregnancyWeek: number;

  toEntity() {
    return UserEntity.from(this.seq, this.nickname, this.dueDate);
  }
}
