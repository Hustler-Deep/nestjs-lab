import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  declare name?: string;

  @IsOptional()
  @IsString()
  declare description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  declare price?: number;
}
