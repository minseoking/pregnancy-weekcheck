import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { UserResolver } from './presentation/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
