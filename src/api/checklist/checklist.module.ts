import { Module } from '@nestjs/common';
import { ChecklistResolver } from './presentation/checklist.resolver';
import { ChecklistRepository } from './infrastructure/checklist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistEntity } from './domain/checklist.entity';
import { UserModule } from '../user/user.module';
import { ChecklistService } from './application/checklist.service';
import { ChecklistSeedEntity } from './domain/checklist-seed.entity';
import { ChecklistSeedRepository } from './infrastructure/checklist-seed.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChecklistEntity, ChecklistSeedEntity]),
    UserModule,
  ],
  providers: [
    ChecklistResolver,
    ChecklistService,
    ChecklistRepository,
    ChecklistSeedRepository,
  ],
})
export class ChecklistModule {}
