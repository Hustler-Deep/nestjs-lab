import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ValidationMessages } from 'src/constants/validation.constants';

export class CreateProductDto {
  @IsNotEmpty({ message: ValidationMessages.name.required })
  @IsString()
  name: string;

  @IsNotEmpty({ message: ValidationMessages.description.required })
  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;
}
