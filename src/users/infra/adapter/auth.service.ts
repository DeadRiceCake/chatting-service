import { Injectable } from '@nestjs/common';
import { AbstractAuthService } from 'src/users/application/adapter/abstractAuth.service';
import { AuthService as ExternalAuthService } from 'src/auth/application/auth.service';
import { Role } from 'src/auth/interface/model/role.model';

@Injectable()
export class AuthService implements AbstractAuthService {
  constructor(private authService: ExternalAuthService) {}

  async checkAuthMobileNumber(
    mobileNumber: string,
    authNumber: string,
  ): Promise<void> {
    await this.authService.checkAuthMobileNumber(mobileNumber, authNumber);
  }

  async signIn(userId: string, role: Role) {
    return await this.authService.signIn(userId, role);
  }

  async sendAuthSMS(mobileNumber: string): Promise<void> {
    await this.authService.sendAuthSMS(mobileNumber);
  }
}
