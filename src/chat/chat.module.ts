import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatRoomService } from './chatRoom.service';

@Module({
  providers: [ChatGateway, ChatRoomService],
})
export class GatewayModule {}
