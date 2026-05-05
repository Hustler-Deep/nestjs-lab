import { IsEmail, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ValidationMessages } from '../../constants/validation.constants';
import { messages } from '../../constants/messages.constants';
import { UserRole } from '../../constants/user-roles.enum';
import { Match } from '../../common/decoraters/match.decorator';

export class RegisterDto {
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

  @IsNotEmpty({ message: ValidationMessages.role.required })
  @IsString()
  @IsIn([UserRole.USER, UserRole.ADMIN])
  role: UserRole;

  @IsNotEmpty({ message: ValidationMessages.name.required })
  @IsString()
  name: string;
}
