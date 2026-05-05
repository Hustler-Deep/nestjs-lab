import { IsEmail, IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { UserRole } from 'src/constants/user-roles.enum';
import { ValidationMessages } from 'src/constants/validation.constants';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: ValidationMessages.password.complexity,
    },
  )
  password?: string;

  @IsOptional()
  @IsIn([UserRole.USER, UserRole.ADMIN])
  @IsString()
  role?: UserRole;

  @IsOptional()
  @IsString()
  name?: string;
}
