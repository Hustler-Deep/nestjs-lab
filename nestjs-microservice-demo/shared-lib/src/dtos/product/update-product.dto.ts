import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  /**
   * New product name
   * @example Updated Headphones
   */
  @IsOptional()
  @IsString()
  declare name?: string;

  /**
   * New product description
   * @example Updated description
   */
  @IsOptional()
  @IsString()
  declare description?: string;

  /**
   * New product price (must be >= 0)
   * @example 59.99
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  declare price?: number;
}
