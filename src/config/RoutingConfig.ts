import { APP_CONFIG } from './EnvConfig';
import { TeamController } from '../business/team/api/TeamController';

export const routingControllerOptions = {
  cors: true,
  routePrefix: APP_CONFIG.API_PREFIX,
  controllers: [TeamController],
  middlewares: [`${__dirname}/../common/middleware/*{.ts,.js}`],
};
