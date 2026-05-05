import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { ValidationMessages } from "../../constants/validation.constants";

export class LoginDto {
  @IsNotEmpty({ message: ValidationMessages.email.required })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: ValidationMessages.password.required })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: ValidationMessages.password.complexity,
    }
  )
  password: string;
}
