import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ChecklistEntity } from '../domain/checklist.entity';
import { ChecklistSeedEntity } from '../domain/checklist-seed.entity';

@Injectable()
export class ChecklistSeedRepository extends Repository<ChecklistSeedEntity> {
  constructor(dataSource: DataSource) {
    super(ChecklistEntity, dataSource.createEntityManager());
  }
  async findAll() {
    return await this.find();
  }
}
