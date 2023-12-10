import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChecklistDto {
  @Field()
  pregnancyWeek: number;

  @Field()
  content: string;

  @Field()
  isCompleted: boolean;

  @Field()
  createdAt: Date;
}
