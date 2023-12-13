import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../../../global/dto/pagination.dto';
import { ChecklistitemEntity } from '../domain/checklistitem.entity';
import { ChecklistDto } from '../presentation/dto/checklist.dto';
import { CreateChecklistInput } from '../presentation/dto/create-checklist.input';
import { UpdateChecklistInput } from '../presentation/dto/update-checklist.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ChecklistRepository } from '../infrastructure/checklist.repository';
import { UserService } from '../../user/application/user.service';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(ChecklistRepository)
    private readonly checklistRepository: ChecklistRepository,
    private readonly userService: UserService,
  ) {}

  async getChecklistForWeek(
    userSeq: number,
    week: number,
    pagination: PaginationDto,
  ) {
    const checklist = await this.checklistRepository.findForWeek(
      userSeq,
      week,
      pagination,
    );
    return checklist.map((checklist) => this.ToChecklistDto(checklist));
  }

  private ToChecklistDto(checklist: ChecklistitemEntity): ChecklistDto {
    return {
      seq: checklist.seq,
      isCompleted: checklist.isCompleted,
      weekNumber: checklist.weekNumber,
      content: checklist.content,
      createdAt: checklist.createdAt,
    };
  }

  async createChecklist(createChecklist: CreateChecklistInput) {
    const user = await this.userService.getUserBySeq(createChecklist.userSeq);

    const checklist = ChecklistitemEntity.create(
      user,
      createChecklist.weekNumber,
      createChecklist.content,
    );
    await this.checklistRepository.save(checklist);
    return 'success';
  }

  async updateChecklist(updateChecklist: UpdateChecklistInput) {
    const checklist = await this.checklistRepository.findOneBy({
      seq: updateChecklist.seq,
    });
    checklist.content = updateChecklist.content;

    return await this.checklistRepository.save(checklist);
  }

  async deleteChecklist(seq: number) {
    await this.checklistRepository.softDelete(seq);
    return true;
  }

  async restoreDeleteChecklist(seq: number) {
    await this.checklistRepository.restore(seq);
    return true;
  }

  async completeChecklist(seq: number) {
    const checklist = await this.checklistRepository.findOneBy({
      seq: seq,
    });
    checklist.complete();
  }

  async cancelCompleteChecklist(seq: number) {
    const checklist = await this.checklistRepository.findOneBy({
      seq: seq,
    });
    checklist.cancelComplete();
  }
}
