import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_CONFIG } from './env.config';

export const jwtConfig: JwtModuleOptions = {
  secret: JWT_CONFIG.JWT_SECRET,
  signOptions: {
    expiresIn: 60 * 60,
  },
};
