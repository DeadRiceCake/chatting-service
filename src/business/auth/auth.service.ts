import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredientialDto } from './dto/authCredential.dto';
import * as bcrypt from 'bcryptjs';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async signUp(
    authCredientialDto: AuthCredientialDto,
  ): Promise<ResponseBody> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authCredientialDto.password, salt);

    authCredientialDto.password = hashedPassword;

    await this.userRepository.createUser(authCredientialDto);

    return new ResponseBody('회원가입 성공');
  }

  public async signIn(
    authCredientialDto: AuthCredientialDto,
  ): Promise<ResponseBody> {
    const { userName, password } = authCredientialDto;
    const user = await this.userRepository.findOneBy({ userName });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { id: user.id, userName };
      const accessToken = this.jwtService.sign(payload);

      return new ResponseBody('로그인 성공', { accessToken });
    } else {
      return new ResponseBody('로그인 실패');
    }
  }
}
