import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredientialDto } from './dto/authCredential.dto';
import * as bcrypt from 'bcryptjs';
import { ResponseBody } from 'src/common/class/responseBody.class';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async signUp(
    authCredientialDto: AuthCredientialDto,
  ): Promise<ResponseBody> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authCredientialDto.password, salt);

    authCredientialDto.password = hashedPassword;

    await this.userRepository.createUser(authCredientialDto);

    return new ResponseBody('회원가입 성공');
  }
}
