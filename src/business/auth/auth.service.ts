import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredientialDto } from './dto/authCredential.dto';
import * as bcrypt from 'bcryptjs';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { ERROR_CODE } from 'src/common/constant/errorCode.constants';
import { UserRepository } from './user.repository';
import { SendAuthSMSRequest } from './dto/sendAuthSMSRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async signUp(
    authCredientialDto: AuthCredientialDto,
  ): Promise<ResponseBody> {
    const { userName, password } = authCredientialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      userName,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === ERROR_CODE.DB.DUPLICATE_ENTRY) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

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

  public async sendAuthSMS(sendAuthSMSRequest: SendAuthSMSRequest) {
    const { mobileNumber } = sendAuthSMSRequest;
  }
}
