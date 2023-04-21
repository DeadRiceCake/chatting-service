import { Module } from '@nestjs/common';
import { BoardsModule } from './business/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), BoardsModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
