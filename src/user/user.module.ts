import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { UserResolver } from './presentation/user.resolver';
import { ChecklistService } from './application/checklist.service';
import { ChecklistRepository } from './infrastructure/checklist.repository';
import { ChecklistResolver } from './presentation/checklist.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    UserService,
    UserResolver,
    ChecklistService,
    ChecklistRepository,
    ChecklistResolver,
  ],
})
export class UserModule {}
