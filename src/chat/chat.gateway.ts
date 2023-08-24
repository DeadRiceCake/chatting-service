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
import {
  CreateChatRoomRequest,
  JoinChatRoomRequest,
  SendMessageRequest,
} from './chat.request';

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
    @MessageBody() body: JoinChatRoomRequest,
  ) {
    this.chatRoomService.joinChatRoom(client, body.roomId);
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: SendMessageRequest,
  ) {
    this.chatRoomService.sendMessage(client, body);
  }

  @SubscribeMessage('getChatRooms')
  getChatRooms(client: Socket) {
    client.emit('getChatRoomList', this.chatRoomService.getChatRooms());
  }
}
