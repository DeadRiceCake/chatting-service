import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRoomService } from './chatRoom.service';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebSocketExceptionsFilter } from 'src/filter/ws-exception.filter';
import { CreateChatRoomRequest } from './chat.request';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UsePipes(new ValidationPipe())
@UseFilters(WebSocketExceptionsFilter)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatRoomService: ChatRoomService) {}

  @WebSocketServer()
  server: Server;

  public handleConnection(@ConnectedSocket() client: Socket) {
    console.log('connected', client.id);
  }

  public handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('disconnected', client.id);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { roomId: string; message: string },
  ) {
    console.log('sendMessage', body.roomId, client.rooms);

    client.to(body.roomId).emit('receiveMessage', body);
  }

  @SubscribeMessage('createChatRoom')
  createChatRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: CreateChatRoomRequest,
  ) {
    this.chatRoomService.createChatRoom(client, body.roomName);
  }

  @SubscribeMessage('joinChatRoom')
  joinChatRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    // this.chatRoomService.joinChatRoom(client, roomId);
    client.join(roomId);
    console.log('joined', client.rooms);
  }

  @SubscribeMessage('getChatRooms')
  getChatRooms(client: Socket) {
    client.emit('getChatRoomList', this.chatRoomService.getChatRooms());
  }
}
