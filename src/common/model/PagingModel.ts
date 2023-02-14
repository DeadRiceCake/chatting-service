import { IsPositive, IsNumber, IsString, IsOptional } from 'class-validator';

export class Paging {
  @IsNumber()
  public offset!: number;

  @IsNumber()
  @IsPositive()
  public limit!: number;

  @IsOptional()
  @IsString()
  public sort?: string;

  constructor(offset: number, limit: number, sort?: string) {
    this.offset = (offset - 1) * limit;
    this.limit = limit;
    if (sort) this.sort = sort;
  }
}
