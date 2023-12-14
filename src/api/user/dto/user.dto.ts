import { Field, ObjectType } from '@nestjs/graphql';

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
}
