import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { boardProviders } from './board.providers';
import { Board } from './board.entity';
import { DatabaseModule } from 'src/common/library/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User]),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [BoardsController],
  providers: [...boardProviders, BoardsService],
})
export class BoardsModule {}
