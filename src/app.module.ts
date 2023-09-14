import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import databaseConfig from './config/database.config';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { GatewayModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { SMSModule } from './common/SMS/SMS.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { AuthModule } from './auth/auth.module';
import redisConfig from './config/redis.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig()),
    TypeOrmModule.forRoot(databaseConfig()),
    CacheModule.register<RedisClientOptions>(redisConfig()),
    UsersModule,
    BoardsModule,
    GatewayModule,
    SMSModule,
    AuthModule,
  ],
  providers: [Logger, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
