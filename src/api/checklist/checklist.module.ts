import { Module } from '@nestjs/common';
import { ChecklistService } from './application/checklist.service';
import { ChecklistResolver } from './presentation/checklist.resolver';
import { ChecklistRepository } from './infrastructure/checklist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistitemEntity } from './domain/checklistitem.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistitemEntity]), UserModule],
  providers: [ChecklistResolver, ChecklistService, ChecklistRepository],
})
export class ChecklistModule {}
