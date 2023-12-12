import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChecklistDto {
  @Field()
  seq: number;

  @Field()
  weekNumber: number;

  @Field()
  content: string;

  @Field()
  isCompleted: boolean;

  @Field()
  createdAt: Date;
}
