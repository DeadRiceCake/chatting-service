import { App } from './App';
import { APP_CONFIG } from './config/EnvConfig';

try {
  const app = new App();
  const port: number = APP_CONFIG.PORT;

  app.createExpressServer(port);
} catch (error) {
  console.log(error);
}
