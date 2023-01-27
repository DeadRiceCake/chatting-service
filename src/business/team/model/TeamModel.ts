import { IsPositive, IsNumber, Max, IsString, IsOptional, IsBoolean } from 'class-validator';

export class Team {
  @IsNumber()
  public id!: number;

  @IsString()
  public name!: string;

  @IsString()
  public league!: string;

  @IsBoolean()
  public isActive!: boolean;
}

export class SelectAllTeamModel {
  @IsNumber()
  public offset!: number;

  @IsNumber()
  @Max(20)
  @IsPositive()
  public limit!: number;

  @IsOptional()
  @IsString()
  public sort?: string;
}
