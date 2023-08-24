export interface IChat {
  chatId: string;
  senderId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
