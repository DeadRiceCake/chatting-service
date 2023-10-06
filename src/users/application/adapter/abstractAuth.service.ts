import { Role } from 'src/auth/interface/model/role.model';

export abstract class AbstractAuthService {
  abstract checkAuthMobileNumber(
    mobileNumber: string,
    authNumber: string,
  ): Promise<void>;

  abstract signIn(
    userId: string,
    role: Role,
  ): Promise<{ refreshToken: string; accessToken: string }>;

  abstract sendAuthSMS(mobileNumber: string): Promise<void>;
}
