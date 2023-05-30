import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredientialDto } from './dto/authCredential.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async signUp(AuthCredientialDto: AuthCredientialDto): Promise<void> {
    return this.userRepository.createUser(AuthCredientialDto);
  }
}
