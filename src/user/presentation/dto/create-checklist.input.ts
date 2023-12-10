import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChecklistInput {
  @Field()
  userSeq: number;

  @Field()
  weekNumber: number;

  @Field()
  content: string;
}
