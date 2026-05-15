import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from 'src/common/decoraters/match.decorator';
import { messages } from 'src/constants/messages.constants';
import { UserRole } from 'src/constants/user-roles.enum';
import { ValidationMessages } from 'src/constants/validation.constants';

export class RegisterDto {
  @ApiProperty({
    type: String,
    example: 'john.doe@yopmail.com',
    description: 'Valid email address — must be unique',
    required: true,
  })
  @IsNotEmpty({ message: ValidationMessages.email.required })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password — min 8 chars, must include upper, lower, digit & special char',
    required: true,
  })
  @IsNotEmpty({ message: ValidationMessages.password.required })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: ValidationMessages.password.complexity,
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Must match the password field exactly',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Match('password', { message: messages.PASSWORD_DOES_NOT_MATCH })
  confirmPassword: string;

  @ApiProperty({
    type: String,
    example: 'user',
    enum: [UserRole.USER, UserRole.ADMIN],
    description: 'User role — either "user" or "admin"',
    required: true,
  })
  @IsNotEmpty({ message: ValidationMessages.role.required })
  @IsString()
  @IsIn([UserRole.USER, UserRole.ADMIN])
  role: UserRole;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    description: 'Full display name',
    required: true,
  })
  @IsNotEmpty({ message: ValidationMessages.name.required })
  @IsString()
  name: string;
}
