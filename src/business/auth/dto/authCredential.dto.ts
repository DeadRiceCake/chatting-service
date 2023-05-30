import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredientialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
