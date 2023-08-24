import { randomUUID } from 'crypto';
import { Chat } from './chat.class';

export class ChatRoom {
  roomId: string;
  roomName: string;
  adminId: string | null;
  chats: Chat[] = [];

  constructor(adminId: string, roomName: string) {
    this.roomId = randomUUID();
    this.roomName = roomName;
    this.adminId = adminId;
  }

  public addChat(chat: Chat) {
    this.chats.push(chat);
  }
}
