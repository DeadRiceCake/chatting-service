export interface Chat {
  chatId: string;
  senderId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
