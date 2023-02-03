import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class Team {
  @IsOptional()
  @IsNumber()
  public id?: number;

  @IsString()
  public name!: string;

  @IsString()
  public league!: string;

  @IsOptional()
  @IsBoolean()
  public isActive?: boolean;
}
