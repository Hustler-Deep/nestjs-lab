import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ValidationMessages } from 'src/constants/validation.constants';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    example: 'Wireless Headphones',
    description: 'Product name — must be unique per user',
    required: true,
  })
  @IsNotEmpty({ message: ValidationMessages.name.required })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Premium noise-cancelling wireless headphones with 30h battery',
    description: 'Detailed product description',
    required: true,
  })
  @IsNotEmpty({ message: ValidationMessages.description.required })
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    example: 49.99,
    description: 'Product price — must be 0 or greater',
    required: true,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;
}
