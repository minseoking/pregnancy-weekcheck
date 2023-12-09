import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  seq: number;

  @Field()
  nickname: string;

  @Field()
  dueDate: string;
}
