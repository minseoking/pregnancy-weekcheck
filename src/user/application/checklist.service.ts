import { Injectable, NotFoundException } from '@nestjs/common';
import { ChecklistEntity } from '../domain/checklist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../global/dto/pagination.dto';
import { ChecklistRepository } from '../infrastructure/checklist.repository';
import { ChecklistDto } from '../presentation/dto/checklist.dto';
import { CreateChecklistInput } from '../presentation/dto/create-checklist.input';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';
import { UpdateChecklistInput } from '../presentation/dto/update-checklist.input';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(ChecklistRepository)
    private readonly checklistRepository: ChecklistRepository,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  private ToChecklistDto(checklist: ChecklistEntity): ChecklistDto {
    return {
      seq: checklist.seq,
      isCompleted: checklist.isCompleted,
      weekNumber: checklist.weekNumber,
      content: checklist.content,
      createdAt: checklist.createdAt,
    };
  }

  async createChecklist(createChecklist: CreateChecklistInput) {
    const user = await this.userRepository.findOneBy({
      seq: createChecklist.userSeq,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

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
    checklist.content = updateChecklist.content;

    return await this.checklistRepository.save(checklist);
  }

  async deleteChecklist(seq: number) {
    await this.checklistRepository.softDelete({ seq: seq });
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
