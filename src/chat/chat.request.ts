import { IsString, IsUUID } from 'class-validator';

export class CreateChatRoomRequest {
  @IsString()
  roomName: string;
}

export class JoinChatRoomRequest {
  @IsUUID(4)
  roomId: string;
}
