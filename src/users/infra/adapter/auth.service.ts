import { Injectable } from '@nestjs/common';
import { AbstractAuthService } from 'src/users/application/adapter/abstractAuth.service';
import { AuthService as ExternalAuthService } from 'src/auth/application/auth.service';
import { Role } from 'src/auth/interface/model/role.model';

@Injectable()
export class AuthService implements AbstractAuthService {
  constructor(private authService: ExternalAuthService) {}

  async signIn(
    userId: string,
    role: Role,
    mobileNumber: string,
    authNumber: string,
  ) {
    return await this.authService.signIn(
      userId,
      role,
      mobileNumber,
      authNumber,
    );
  }

  async sendAuthSMS(mobileNumber: string): Promise<void> {
    await this.authService.sendAuthSMS(mobileNumber);
  }

  async refresh(refreshToken: string): Promise<string> {
    return await this.authService.refresh(refreshToken);
  }
}
