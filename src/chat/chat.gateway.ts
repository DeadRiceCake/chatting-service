import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server = this.server) {
    server.on('connection', (socket) => {
      console.log('connected');
      console.log(socket.id);
    });
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() body: { message: string }): { message: string } {
    this.server.emit('onMessage', body);
    return body;
  }

  @SubscribeMessage('joinChatRoom')
  joinChatRoom(client: Socket, chatRoomId: string) {
    client.join(chatRoomId);
  }
}
