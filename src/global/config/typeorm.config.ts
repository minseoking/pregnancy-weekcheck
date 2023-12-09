import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'mysql',
      host: configService.get('DATABASE_HOST'),
      username: configService.get('DATABASE_USER'),
      database: configService.get('DATABASE_NAME'),
      password: configService.get('DATABASE_PASSWORD'),
      port: 3306,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  },
};
