import { ApiProperty } from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/common/swagger/api-response.dto';

export class UserDataDto {
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

export class UserResponseDto extends ApiSuccessResponse<UserDataDto> {
  @ApiProperty({ type: UserDataDto })
  declare data: UserDataDto;
}

export class UserListResponseDto extends ApiSuccessResponse<UserDataDto[]> {
  @ApiProperty({ type: [UserDataDto] })
  declare data: UserDataDto[];
}

export class DeleteUserResponseDto extends ApiSuccessResponse<null> {
  @ApiProperty({ example: null, nullable: true })
  declare data: null;
}
