import { ChecklistitemEntity } from '../domain/checklistitem.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../../global/dto/pagination.dto';

@Injectable()
export class ChecklistRepository extends Repository<ChecklistitemEntity> {
  constructor(dataSource: DataSource) {
    super(ChecklistitemEntity, dataSource.createEntityManager());
  }

  async findForWeek(userSeq: number, week: number, pagination: PaginationDto) {
    const order = pagination.orderBy
      ? { [pagination.orderBy]: 'ASC' }
      : undefined;

    return await this.find({
      where: { user: { seq: userSeq }, weekNumber: week },
      take: pagination.limit,
      skip: pagination.offset,
      order: order,
    });
  }
}
