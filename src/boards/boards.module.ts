import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { DatabaseModule } from 'src/common/library/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { User } from '../users/infra/db/entity/user.entity';
import { BoardRepository } from './board.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User]),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
