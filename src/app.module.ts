import { Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './global/config/typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlConfig } from './global/config/graphql.config';
import { PresentationModule } from './test/presentation/presentation.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync(graphqlConfig),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,
    PresentationModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
