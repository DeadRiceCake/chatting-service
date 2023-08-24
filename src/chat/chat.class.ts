import { randomUUID } from 'crypto';

export class Chat {
  chatId: string;
  senderId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;

  constructor(senderId: string, message: string) {
    this.chatId = randomUUID();
    this.senderId = senderId;
    this.message = message;
    this.isRead = false;
    this.createdAt = new Date();
  }
}
