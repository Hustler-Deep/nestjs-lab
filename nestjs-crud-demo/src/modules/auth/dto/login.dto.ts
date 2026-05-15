import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ValidationMessages } from 'src/constants/validation.constants';

export class LoginDto {
  @ApiProperty({
    type: String,
    example: 'john.doe@yopmail.com',
    description: 'Registered email address',
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
}
