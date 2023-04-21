import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { boardProviders } from './board.providers';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { DatabaseModule } from 'src/common/library/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), DatabaseModule],
  controllers: [BoardsController],
  providers: [...boardProviders, BoardsService, BoardRepository],
})
export class BoardsModule {}
