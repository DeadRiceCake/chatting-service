import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export class SocketServer {
  private io: Server;

  constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {});
  }

  public createSocketServer(): void {
    this.io.on('connection', (socket) => {
      console.log(`소켓 연결 성공`);
      console.log('새로운 클라이언트 접속!', socket.id);

      socket.on('disconnect', () => {
        console.log('클라이언트 접속 해제', socket.id);
      });

      socket.on('error', (error) => {
        console.error(error);
      });

      socket.on('reply', (data) => {
        console.log(data);
      });
    });
  }
}
