import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { CustomUnauthorizedException } from 'src/common/exception/unauthorization.exception';
import { ERROR_CODE } from 'src/common/constant/errorCode.constants';
import { AuthService } from './application/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new CustomUnauthorizedException(
        ERROR_CODE.AUTH.NO_TOKEN,
        '토큰이 존재하지 않습니다.',
      );
    }

    return this.validateRequest(token);
  }

  private validateRequest(token: string) {
    this.authService.verify(token);

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
