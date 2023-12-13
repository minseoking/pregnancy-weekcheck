import { Field, InputType } from '@nestjs/graphql';
import { ValidateDateFormat } from '../../../../global/decorators/validate-date-format.decorator';

@InputType()
export class UpdateUserInput {
  @Field()
  seq: number;

  @Field()
  nickname: string;

  @Field()
  @ValidateDateFormat('YYYY-MM-DD', {
    message: 'dueDate must be in the format YYYY-MM-DD',
  })
  dueDate: string;
}
