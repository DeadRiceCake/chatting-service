import { ChatRoom } from './chat.type';

export class chatRoomDTO implements ChatRoom {
  roomId: string;
  adminId: string | null;
  name: string;
}
