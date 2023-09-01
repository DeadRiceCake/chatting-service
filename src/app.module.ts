import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { BoardsModule } from './business/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import databaseConfig from './config/database.config';
import { AuthModule } from './business/auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { GatewayModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { SMSModule } from './common/SMS/SMS.module';
import ncpConfig from './config/ncp.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      load: [databaseConfig, ncpConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    AuthModule,
    BoardsModule,
    GatewayModule,
    SMSModule,
  ],
  providers: [Logger, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
