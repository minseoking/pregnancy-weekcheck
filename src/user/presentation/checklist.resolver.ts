import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChecklistService } from '../application/checklist.service';
import { ChecklistDto } from './dto/checklist.dto';
import { PaginationDto } from '../../global/dto/pagination.dto';
import { CreateChecklistInput } from './dto/create-checklist.input';

@Resolver('Checklist')
export class ChecklistResolver {
  constructor(private readonly checklistService: ChecklistService) {}

  @Query(() => [ChecklistDto])
  async getChecklist(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('week', { type: () => Int }) week: number,
    @Args('pagination') pagination: PaginationDto,
  ): Promise<ChecklistDto[]> {
    return await this.checklistService.getChecklistForWeek(
      userId,
      week,
      pagination,
    );
  }

  @Mutation(() => String)
  async addChecklist(
    @Args('createChecklist') createChecklist: CreateChecklistInput,
  ) {
    return await this.checklistService.createChecklist(createChecklist);
  }
}
