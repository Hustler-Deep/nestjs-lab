import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';
import { messages } from '../../constants/messages.constants';
import { UserRole } from '../../constants/user-roles.enum';
import { ValidationMessages } from '../../constants/validation.constants';

export class CreateUserDto {
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

  /**
   * Must match the password field
   * @example P@ssw0rd!
   */
  @IsNotEmpty()
  @IsString()
  @Match('password', { message: messages.PASSWORD_DOES_NOT_MATCH })
  declare confirmPassword: string;

  /**
   * User role (defaults to user)
   * @example user
   */
  @IsOptional()
  @IsIn([UserRole.USER, UserRole.ADMIN])
  @IsString()
  declare role: UserRole;

  /**
   * Full name of the user
   * @example John Doe
   */
  @IsString()
  @IsNotEmpty({ message: ValidationMessages.name.required })
  declare name: string;
}
