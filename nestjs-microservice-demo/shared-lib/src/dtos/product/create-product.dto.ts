import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ValidationMessages } from "../../constants/validation.constants";

export class CreateProductDto {
  /**
   * Product name
   * @example Wireless Headphones
   */
  @IsNotEmpty({ message: ValidationMessages.name.required })
  @IsString()
  declare name: string;

  /**
   * Product description
   * @example Premium noise-cancelling wireless headphones
   */
  @IsNotEmpty({ message: ValidationMessages.description.required })
  @IsString()
  declare description: string;

  /**
   * Product price (must be >= 0)
   * @example 49.99
   */
  @IsNotEmpty({ message: ValidationMessages.price.required })
  @IsNumber()
  @Min(0)
  declare price: number;
}
