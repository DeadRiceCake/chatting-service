import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { Container } from 'typedi';
import { useContainer, useExpressServer } from 'routing-controllers';
import { routingControllerOptions } from '../../../src/config/Routing';
import { createDBPool } from '../../../src/common/module/Database';

export class TestApp {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setDatabase();
    this.setMiddlewares();
    useContainer(Container);
    useExpressServer(this.app, routingControllerOptions);
  }

  /**
   * 데이터베이스를 세팅한다.
   */
  private async setDatabase(): Promise<void> {
    try {
      createDBPool();
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
  }
}
