import { Module } from '@nestjs/common';
import { BoardsModule } from './business/boards/boards.module';

@Module({
  imports: [BoardsModule],
})
export class AppModule {}
