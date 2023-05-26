import { Module } from '@nestjs/common';
import { BoardsModule } from './business/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './business/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), BoardsModule, AuthModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
