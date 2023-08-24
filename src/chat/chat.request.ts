import { IsString } from 'class-validator';

export class CreateChatRoomRequest {
  @IsString()
  roomName: string;
}
