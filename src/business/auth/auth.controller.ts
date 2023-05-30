import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredientialDto } from './dto/authCredential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  public signUp(
    @Body(ValidationPipe) authCredientialDto: AuthCredientialDto,
  ): Promise<void> {
    return this.authService.signUp(authCredientialDto);
  }
}
