import { ApiProperty } from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/common/swagger/api-response.dto';

export class AuthUserDto {
  @ApiProperty({ example: 1, description: 'Unique user ID' })
  id: number;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name' })
  name: string;

  @ApiProperty({
    example: 'user',
    enum: ['user', 'admin'],
    description: 'User role',
  })
  role: string;
}

export class LoginDataDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token',
  })
  access_token: string;

  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;
}

export class RegisterDataDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'user', enum: ['user', 'admin'] })
  role: string;

  @ApiProperty({ example: '2026-05-07T08:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-05-07T08:00:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: string | null;
}

export class LoginResponseDto extends ApiSuccessResponse<LoginDataDto> {
  @ApiProperty({ type: LoginDataDto })
  declare data: LoginDataDto;
}

export class RegisterResponseDto extends ApiSuccessResponse<RegisterDataDto> {
  @ApiProperty({ type: RegisterDataDto })
  declare data: RegisterDataDto;
}
