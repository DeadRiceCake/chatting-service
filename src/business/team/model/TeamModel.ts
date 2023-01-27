import { IsPositive, IsNumber, Max, IsString, IsOptional } from 'class-validator';

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
