import { Socket } from 'socket.io';
import { ChatRoom } from './chat.interface';
import { randomUUID } from 'crypto';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
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
    console.log(this.#chatRooms);
    client.join(roomId);
    client.emit('onChatRoomCreated', chatRoom);
  }

  public joinChatRoom(client: Socket, roomId: string) {
    client.join(roomId);

    const chatRoom = this.getChatRoom(roomId);

    client.to(roomId).emit('onJoinChatRoom', chatRoom);
  }

  public leaveChatRoom(client: Socket) {
    const roomId = client.data.roomId;
    client.leave(roomId);

    const chatRoom = this.getChatRoom(roomId);

    client.to(roomId).emit('onLeaveChatRoom', chatRoom);
  }

  public getChatRoom(roomId: string) {
    const chatRoom = this.#chatRooms.find((room) => room.roomId === roomId);
    if (!chatRoom) throw new BadRequestException('존재하지 않는 채팅방입니다.');

    return chatRoom;
  }

  public getChatRooms() {
    return this.#chatRooms;
  }

  public deleteChatRoom(roomId: string) {
    this.#chatRooms = this.#chatRooms.filter((room) => room.roomId !== roomId);
  }
}
