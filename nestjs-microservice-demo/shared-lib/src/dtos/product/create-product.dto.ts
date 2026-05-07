import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ValidationMessages } from "../../constants/validation.constants";

export class CreateProductDto {
  @IsNotEmpty({ message: ValidationMessages.name.required })
  @IsString()
  declare name: string;

  @IsNotEmpty({ message: ValidationMessages.description.required })
  @IsString()
  declare description: string;

  @IsNotEmpty({ message: ValidationMessages.price.required })
  @IsNumber()
  @Min(0)
  declare price: number;
}
