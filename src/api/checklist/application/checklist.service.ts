import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../../../global/dto/pagination.dto';
import { ChecklistEntity } from '../domain/checklist.entity';
import { ChecklistDto } from '../dto/checklistDto';
import { CreateChecklistInput } from '../dto/create-checklist.input';
import { UpdateChecklistInput } from '../dto/update-checklist.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ChecklistRepository } from '../infrastructure/checklist.repository';
import { UserService } from '../../user/application/user.service';
import { ChecklistSeedRepository } from '../infrastructure/checklist-seed.repository';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(ChecklistRepository)
    private readonly checklistRepository: ChecklistRepository,
    @InjectRepository(ChecklistSeedRepository)
    private readonly checklistSeedRepository: ChecklistSeedRepository,
    private readonly userService: UserService,
  ) {}

  async getChecklistItemForWeek(
    userSeq: number,
    week: number,
    pagination: PaginationDto,
  ) {
    const checklist = await this.checklistRepository.findForWeek(
      userSeq,
      week,
      pagination,
    );
    return checklist.map((checklist) => this.ToChecklistItemDto(checklist));
  }

  private ToChecklistItemDto(checklist: ChecklistEntity): ChecklistDto {
    return {
      seq: checklist.seq,
      isCompleted: checklist.isCompleted,
      weekNumber: checklist.weekNumber,
      content: checklist.content,
      createdAt: checklist.createdAt,
    };
  }

  /**
   * 사용자가 추가되면 공통 체크리스트를 사용자 체크리스트에 넣어줌
   * @param userSeq 사용자 seq
   */
  async initUserChecklist(userSeq: number) {
    const user = await this.userService.getUserBySeq(userSeq);
    const checklistSeeds = (await this.checklistSeedRepository.find()).map(
      (checklist) => {
        return ChecklistEntity.create(
          user,
          checklist.weekNumber,
          checklist.content,
        );
      },
    );
    await this.checklistRepository.insert(checklistSeeds);
  }

  async createChecklist(createChecklist: CreateChecklistInput) {
    const user = await this.userService.getUserBySeq(createChecklist.userSeq);

    const checklist = ChecklistEntity.create(
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
    if (!checklist) {
      throw new NotFoundException('Checklist not found');
    }
    checklist.updateContent(updateChecklist.content);

    return await this.checklistRepository.save(checklist);
  }

  async deleteChecklist(seq: number, isDeleted: boolean) {
    if (isDeleted) {
      await this.checklistRepository.softDelete(seq);
    } else {
      await this.checklistRepository.restore(seq);
    }
    return true;
  }

  async updateCompleteChecklist(seq: number, isCompleted: boolean) {
    const checklist = await this.checklistRepository.findOneBy({
      seq: seq,
    });
    checklist.updateComplete(isCompleted);

    return await this.checklistRepository.save(checklist);
  }
}
