import { Socket } from 'socket.io';
import { ChatRoom } from './chatRoom.class';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatRoomService {
  private chatRooms: ChatRoom[] = [];

  public createChatRoom(client: Socket, roomName: string) {
    const chatRoom = new ChatRoom(client.id, roomName);

    this.chatRooms.push(chatRoom);
    client.join(chatRoom.roomId);
    console.log('created', client.rooms);
  }

  public joinChatRoom(client: Socket, roomId: string) {
    client.join(roomId);

    const chatRoom = this.getChatRoom(roomId);

    client.to(roomId).emit('onJoinChatRoom', chatRoom);
    console.log('joined', client.rooms);
  }

  public leaveChatRoom(client: Socket) {
    const roomId = client.data.roomId;
    client.leave(roomId);

    const chatRoom = this.getChatRoom(roomId);

    client.to(roomId).emit('onLeaveChatRoom', chatRoom);
  }

  public getChatRoom(roomId: string) {
    const chatRoom = this.chatRooms.find((room) => room.roomId === roomId);
    if (!chatRoom) throw new WsException('존재하지 않는 채팅방입니다.');

    return chatRoom;
  }

  public getChatRooms() {
    return this.chatRooms;
  }

  public deleteChatRoom(roomId: string) {
    this.chatRooms = this.chatRooms.filter((room) => room.roomId !== roomId);
  }
}
