import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { Container } from 'typedi';
import { useContainer, useExpressServer } from 'routing-controllers';
import { routingControllerOptions } from './config/RoutingConfig';
import morgan from 'morgan';
import { useSwagger } from './Swagger';
// TODO: swagger 적용하기
// TODO: sentry 적용하기

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setDatabase();
    this.setMiddlewares();
  }

  /**
   * 데이터베이스를 세팅한다.
   */
  private async setDatabase(): Promise<void> {
    try {
      // TODO: 데이터베이스 연결하기
      // await createDatabaseConnection();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 미들웨어를 세팅한다.
   */
  private setMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan('combined'));
  }

  /**
   * Express를 시작한다.
   * @param port 포트 번호
   */
  public async createExpressServer(port: number): Promise<void> {
    try {
      useContainer(Container);
      useExpressServer(this.app, routingControllerOptions);
      useSwagger(this.app);

      this.app.listen(port, () => {
        console.log(`서버 가동중... 포트번호: ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
