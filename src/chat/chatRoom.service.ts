import { Socket } from 'socket.io';
import { ChatRoom } from './chat.type';
import { randomUUID } from 'crypto';

export class ChatRoomService {
  #chatRooms: ChatRoom[] = [];

  public createChatRoom(client: Socket, roomName: string) {
    const roomId = randomUUID();
    const chatRoom: ChatRoom = {
      roomId,
      adminId: client.id,
      name: roomName,
    };

    this.#chatRooms.push(chatRoom);

    client.data.roomId = roomId;
    client.join(roomId);
    client.emit('onChatRoomCreated', chatRoom);
  }

  public joinChatRoom(client: Socket, roomId: string) {
    client.data.roomId = roomId;
    client.join(roomId);
  }
}
