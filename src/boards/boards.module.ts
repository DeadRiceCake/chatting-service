import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { DatabaseModule } from 'src/common/library/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/user.entity';
import { BoardRepository } from './board.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User]),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}