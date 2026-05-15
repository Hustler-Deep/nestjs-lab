import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    type: String,
    example: 'Wireless Headphones Pro',
    description: 'Updated product name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Next-gen noise-cancelling headphones with 40h battery',
    description: 'Updated product description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    type: Number,
    example: 59.99,
    description: 'Updated product price — must be 0 or greater',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
