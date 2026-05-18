import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { ValidationMessages } from '../../constants/validation.constants';
import { messages } from '../../constants/messages.constants';
import { UserRole } from '../../constants/user-roles.enum';
import { Match } from '../../common/decorators/match.decorator';

export class RegisterDto {
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
   * User role
   * @example user
   */
  @IsNotEmpty({ message: ValidationMessages.role.required })
  @IsString()
  @IsIn([UserRole.USER, UserRole.ADMIN])
  declare role: UserRole;

  /**
   * Full name of the user
   * @example John Doe
   */
  @IsNotEmpty({ message: ValidationMessages.name.required })
  @IsString()
  declare name: string;
}
