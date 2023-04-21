import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { DatabaseModule } from 'src/common/library/database/database.module';
import { boardProviders } from './board.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BoardsController],
  providers: [...boardProviders, BoardsService],
})
export class BoardsModule {}
