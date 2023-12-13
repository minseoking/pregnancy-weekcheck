import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChecklistService } from '../application/checklist.service';
import { ChecklistDto } from './dto/checklistDto';
import { PaginationDto } from '../../../global/dto/pagination.dto';
import { CreateChecklistInput } from './dto/create-checklist.input';
import { UpdateChecklistInput } from './dto/update-checklist.input';

@Resolver('Checklist')
// @UseGuards(AuthGuard)
export class ChecklistResolver {
  constructor(private readonly checklistService: ChecklistService) {}

  @Query(() => [ChecklistDto])
  async getChecklist(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('week', { type: () => Int }) week: number,
    @Args('pagination') pagination: PaginationDto,
  ): Promise<ChecklistDto[]> {
    return await this.checklistService.getChecklistItemForWeek(
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

  @Mutation(() => ChecklistDto)
  async updateChecklist(
    @Args('updateChecklist') updateChecklist: UpdateChecklistInput,
  ) {
    return await this.checklistService.updateChecklist(updateChecklist);
  }

  @Mutation(() => Boolean)
  async updateDeleteChecklist(
    @Args('seq') seq: number,
    @Args('isDeleted') isDeleted: boolean,
  ) {
    return await this.checklistService.deleteChecklist(seq, isDeleted);
  }

  @Mutation(() => ChecklistDto)
  async updateCompleteChecklist(
    @Args('seq') seq: number,
    @Args('isCompleted') isCompleted: boolean,
  ) {
    return await this.checklistService.updateCompleteChecklist(
      seq,
      isCompleted,
    );
  }
}
