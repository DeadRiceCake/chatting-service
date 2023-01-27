import { IsNumber, IsString, IsBoolean } from 'class-validator';

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
