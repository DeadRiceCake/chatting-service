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
import { CreateChatRoomOption } from './chat.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
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
    @MessageBody() body: { message: string },
  ) {
    const { roomId } = client.data;

    client.to(roomId).emit('receiveMessage', { clientId: client.id, ...body });
  }

  @SubscribeMessage('createChatRoom')
  createChatRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: CreateChatRoomOption,
  ) {
    this.chatRoomService.createChatRoom(client, body.name);
  }

  @SubscribeMessage('joinChatRoom')
  joinChatRoom(@ConnectedSocket() client: Socket, roomId: string) {
    this.chatRoomService.joinChatRoom(client, roomId);
  }
}
