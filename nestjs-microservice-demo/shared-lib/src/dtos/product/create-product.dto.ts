import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ValidationMessages } from "../../constants/validation.constants";

export class CreateProductDto {
  @IsNotEmpty({ message: ValidationMessages.name.required })
  @IsString()
  name: string;

  @IsNotEmpty({ message: ValidationMessages.description.required })
  @IsString()
  description: string;

  @IsNotEmpty({ message: ValidationMessages.price.required })
  @IsNumber()
  @Min(0)
  price: number;
}
