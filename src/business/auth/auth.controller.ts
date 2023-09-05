import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './getUser.decorator';
import { JwtPayload } from './jwt.payload';
import { ApiTags } from '@nestjs/swagger';
import { SendAuthSMSRequest } from './dto/sendAuthSMSRequest.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/test')
  @UseGuards(AuthGuard())
  public test(@GetUser() user: JwtPayload) {
    console.log(user);
  }

  @Post('/sms')
  public sendAuthSMS(
    @Body(ValidationPipe) sendAuthSMSRequest: SendAuthSMSRequest,
  ) {
    return this.authService.sendAuthSMS(sendAuthSMSRequest);
  }
}
