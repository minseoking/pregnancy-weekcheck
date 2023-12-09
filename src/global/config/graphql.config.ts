import { ApolloDriver, ApolloDriverAsyncConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const graphqlConfig: ApolloDriverAsyncConfig = {
  driver: ApolloDriver,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async () => ({
    playground: true,
    autoSchemaFile: true,
  }),
};
