import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class Team {
  @IsNumber()
  public id!: number;

  @IsString()
  public name!: string;

  @IsString()
  public league!: string;

  @IsOptional()
  @IsBoolean()
  public isActive?: boolean;
}
