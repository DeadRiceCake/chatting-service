import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

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

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: { message: string }): { message: string } {
    console.log(body);
    this.server.emit('onMessage', { message: body.message });
    return body;
  }
}
