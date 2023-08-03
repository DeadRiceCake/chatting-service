import { ChatRoom } from './chat.interface';

export class chatRoomDTO implements ChatRoom {
  roomId: string;
  adminId: string | null;
  name: string;
}
