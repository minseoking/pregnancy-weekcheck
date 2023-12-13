import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './global/config/typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlConfig } from './global/config/graphql.config';
import { APP_PIPE } from '@nestjs/core';
import { ChecklistModule } from './api/checklist/checklist.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync(graphqlConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,
    ChecklistModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
