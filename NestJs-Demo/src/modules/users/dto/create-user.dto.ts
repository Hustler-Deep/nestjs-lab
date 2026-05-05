import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Match } from 'src/common/decoraters/match.decorator';
import { messages } from 'src/constants/messages.constants';
import { UserRole } from 'src/constants/user-roles.enum';
import { ValidationMessages } from 'src/constants/validation.constants';

export class CreateUserDto {
  @IsNotEmpty({ message: ValidationMessages.email.required })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: ValidationMessages.password.required })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: ValidationMessages.password.complexity,
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', { message: messages.PASSWORD_DOES_NOT_MATCH })
  confirmPassword: string;

  @IsOptional()
  @IsIn([UserRole.USER, UserRole.ADMIN])
  @IsString()
  role?: UserRole;

  @IsString()
  name: string;
}
