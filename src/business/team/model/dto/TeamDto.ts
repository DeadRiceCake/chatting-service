import { IsBoolean, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  public name!: string;

  @IsString()
  public league!: string;
}

export class UpdateTeamDto {
  @IsString()
  public name!: string;

  @IsString()
  public league!: string;

  @IsBoolean()
  public is_active!: boolean;
}
