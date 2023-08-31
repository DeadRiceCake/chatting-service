import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredientialDto } from './dto/authCredential.dto';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './getUser.decorator';
import { JwtPayload } from './jwt.payload';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { SendAuthSMSRequest } from './dto/sendAuthSMSRequest.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: '회원가입 성공',
    type: ResponseBody,
  })
  public signUp(
    @Body(ValidationPipe) authCredientialDto: AuthCredientialDto,
  ): Promise<ResponseBody> {
    return this.authService.signUp(authCredientialDto);
  }

  @Post('/signin')
  public signIn(
    @Body(ValidationPipe) authCredientialDto: AuthCredientialDto,
  ): Promise<ResponseBody> {
    return this.authService.signIn(authCredientialDto);
  }

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
