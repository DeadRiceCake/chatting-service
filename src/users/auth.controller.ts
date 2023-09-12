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
import { ResponseBody } from 'src/common/class/responseBody.class';
import { VerifyAuthNumberRequest } from './dto/verifyAuthNumberRequest.dto';
import { SignUpRequest } from './dto/signupRequest.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './application/command/createUser.command';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private commandBus: CommandBus,
  ) {}

  @Post('/test')
  @UseGuards(AuthGuard())
  public test(@GetUser() user: JwtPayload) {
    console.log(user);
  }

  @Post('/sms')
  public async sendAuthSMS(
    @Body(ValidationPipe) sendAuthSMSRequest: SendAuthSMSRequest,
  ) {
    return new ResponseBody(
      '인증번호 전송 성공',
      await this.authService.sendAuthSMS(sendAuthSMSRequest),
    );
  }

  @Post('/sms/verify')
  public async verifyAuthSMS(
    @Body() verifyAuthNumberRequest: VerifyAuthNumberRequest,
  ) {
    return new ResponseBody(
      '인증번호 검증 성공',
      await this.authService.verifyAuthSMS(verifyAuthNumberRequest),
    );
  }

  @Post('/signup')
  public async signup(@Body() signUpRequest: SignUpRequest) {
    const { mobileNumber, nickname } = signUpRequest;

    const command = new CreateUserCommand(mobileNumber, nickname);

    return new ResponseBody(
      '회원가입 성공',
      await this.commandBus.execute(command),
    );
  }
}
