import {APP_CONFIG} from './config';

export const routingControllerOptions = {
  cors: true,
  routePrefix: APP_CONFIG.API_PREFIX,
  controllers: [`${__dirname}/../business/**/api/${/Controller$/}{.ts,.js}`],
  middlewares: [`${__dirname}/../common/middleware/*{.ts,.js}`],
};
