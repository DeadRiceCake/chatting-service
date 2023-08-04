import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredientialDto {
  @ApiProperty({
    description: '유저 이름',
    example: 'kawaii',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
