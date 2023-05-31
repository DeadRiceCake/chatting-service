import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredientialDto } from './dto/authCredential.dto';
import { ResponseBody } from 'src/common/class/responseBody.class';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  public signUp(
    @Body(ValidationPipe) authCredientialDto: AuthCredientialDto,
  ): Promise<ResponseBody> {
    return this.authService.signUp(authCredientialDto);
  }
}
