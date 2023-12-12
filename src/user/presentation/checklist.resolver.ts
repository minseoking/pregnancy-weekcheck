import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChecklistService } from '../application/checklist.service';
import { ChecklistDto } from './dto/checklist.dto';
import { PaginationDto } from '../../global/dto/pagination.dto';
import { CreateChecklistInput } from './dto/create-checklist.input';
import { UpdateChecklistInput } from './dto/update-checklist.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../global/guards/auth.guard';

@Resolver('Checklist')
@UseGuards(AuthGuard)
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

  @Mutation(() => ChecklistDto)
  async updateChecklist(
    @Args('updateChecklist') updateChecklist: UpdateChecklistInput,
  ) {
    return await this.checklistService.updateChecklist(updateChecklist);
  }

  @Mutation(() => Boolean)
  async deleteChecklist(@Args('seq') seq: number) {
    return await this.checklistService.deleteChecklist(seq);
  }

  @Mutation(() => ChecklistDto)
  async completeChecklist(@Args('seq') seq: number) {
    return await this.checklistService.completeChecklist(seq);
  }

  @Mutation(() => ChecklistDto)
  async cancelCompleteChecklist(@Args('seq') seq: number) {
    return await this.checklistService.cancelCompleteChecklist(seq);
  }
}
