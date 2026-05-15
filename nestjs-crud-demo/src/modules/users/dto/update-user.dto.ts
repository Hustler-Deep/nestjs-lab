import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { UserRole } from 'src/constants/user-roles.enum';
import { ValidationMessages } from 'src/constants/validation.constants';

export class UpdateUserDto {
  @ApiPropertyOptional({
    type: String,
    example: 'updated.email@yopmail.com',
    description: 'New email address — must be unique',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'New password — min 8 chars, must include upper, lower, digit & special char',
  })
  @IsOptional()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: ValidationMessages.password.complexity,
  })
  password?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'admin',
    enum: [UserRole.USER, UserRole.ADMIN],
    description: 'New role for the user',
  })
  @IsOptional()
  @IsIn([UserRole.USER, UserRole.ADMIN])
  @IsString()
  role?: UserRole;

  @ApiPropertyOptional({
    type: String,
    example: 'Jane Updated',
    description: 'Updated display name',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
