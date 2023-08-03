export interface ChatRoom {
  roomId: string;
  adminId: string | null;
  name: string;
}

export type CreateChatRoomOption = Pick<ChatRoom, 'name'>;
