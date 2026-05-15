import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decoraters/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiErrorResponseWrapped, ApiOkResponseWrapped } from 'src/common/swagger/api-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  DeleteUserResponseDto,
  UserListResponseDto,
  UserResponseDto,
} from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new user (admin only)' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponseWrapped(UserResponseDto)
  @ApiErrorResponseWrapped(HttpStatus.BAD_REQUEST, 'Validation error', 'Invalid input data')
  @ApiErrorResponseWrapped(HttpStatus.UNAUTHORIZED, 'Missing or invalid JWT token', 'Unauthorized')
  @ApiErrorResponseWrapped(
    HttpStatus.FORBIDDEN,
    'Insufficient role — admin required',
    'Forbidden resource',
  )
  @ApiErrorResponseWrapped(
    HttpStatus.CONFLICT,
    'Email already in use',
    'User with this email already exists',
  )
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users (requires auth, any role)' })
  @ApiOkResponseWrapped(UserListResponseDto, true)
  @ApiErrorResponseWrapped(HttpStatus.UNAUTHORIZED, 'Missing or invalid JWT token', 'Unauthorized')
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get a single user by ID (admin only)' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'User ID' })
  @ApiOkResponseWrapped(UserResponseDto)
  @ApiErrorResponseWrapped(HttpStatus.NOT_FOUND, 'User not found', 'User not found.')
  @ApiErrorResponseWrapped(HttpStatus.UNAUTHORIZED, 'Missing or invalid JWT token', 'Unauthorized')
  @ApiErrorResponseWrapped(
    HttpStatus.FORBIDDEN,
    'Insufficient role — admin required',
    'Forbidden resource',
  )
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a user by ID (admin only)' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponseWrapped(UserResponseDto)
  @ApiErrorResponseWrapped(HttpStatus.BAD_REQUEST, 'Validation error', 'Invalid input data')
  @ApiErrorResponseWrapped(HttpStatus.NOT_FOUND, 'User not found', 'User not found.')
  @ApiErrorResponseWrapped(HttpStatus.UNAUTHORIZED, 'Missing or invalid JWT token', 'Unauthorized')
  @ApiErrorResponseWrapped(
    HttpStatus.FORBIDDEN,
    'Insufficient role — admin required',
    'Forbidden resource',
  )
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a user by ID (admin only)' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'User ID' })
  @ApiOkResponseWrapped(DeleteUserResponseDto)
  @ApiErrorResponseWrapped(HttpStatus.NOT_FOUND, 'User not found', 'User not found.')
  @ApiErrorResponseWrapped(HttpStatus.UNAUTHORIZED, 'Missing or invalid JWT token', 'Unauthorized')
  @ApiErrorResponseWrapped(
    HttpStatus.FORBIDDEN,
    'Insufficient role — admin required',
    'Forbidden resource',
  )
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
