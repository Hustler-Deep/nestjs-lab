import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ValidationMessages } from "../../constants/validation.constants";

export class LoginDto {
  /**
   * User email address
   * @example john.doe@example.com
   */
  @IsNotEmpty({ message: ValidationMessages.email.required })
  @IsEmail()
  declare email: string;

  /**
   * User password (min 8 chars, uppercase, lowercase, number, special char)
   * @example P@ssw0rd!
   */
  @IsNotEmpty({ message: ValidationMessages.password.required })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: ValidationMessages.password.complexity,
    },
  )
  declare password: string;
}
