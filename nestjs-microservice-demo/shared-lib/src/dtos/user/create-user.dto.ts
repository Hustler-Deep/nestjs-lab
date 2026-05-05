import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Match } from '../../common/decoraters/match.decorator';
import { messages } from '../../constants/messages.constants';
import { UserRole } from '../../constants/user-roles.enum';
import { ValidationMessages } from '../../constants/validation.constants';

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
