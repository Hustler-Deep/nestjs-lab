import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiErrorResponseWrapped,
  ApiOkMessageOnly,
  ApiOkResponseWrapped,
  CreateUserDto,
  MessagePatterns,
  messages,
  Roles,
  ServiceTokens,
  UpdateUserDto,
  UserDataDto,
} from '@nestjs/shared-lib';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    @Inject(ServiceTokens.USER_SERVICE)
    private readonly userService: ClientProxy,
  ) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new user (admin only)' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponseWrapped(UserDataDto)
  @ApiErrorResponseWrapped(400, 'Validation / duplicate email', messages.EMAIL_ALREADY_EXISTS)
  @ApiErrorResponseWrapped(401, 'Unauthorized', messages.UNAUTHORIZED)
  @ApiErrorResponseWrapped(403, 'Forbidden — admin only', messages.ACCESS_DENIED)
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<Record<string, unknown>> {
    return firstValueFrom(
      this.userService.send<Record<string, unknown>, CreateUserDto>(
        MessagePatterns.USER_CREATE,
        createUserDto,
      ),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponseWrapped(UserDataDto, true)
  @ApiErrorResponseWrapped(401, 'Unauthorized', messages.UNAUTHORIZED)
  getUsers() {
    return firstValueFrom(this.userService.send(MessagePatterns.USER_GET_ALL, {}));
  }

  @Get(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Get a single user by ID (admin only)' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiOkResponseWrapped(UserDataDto)
  @ApiErrorResponseWrapped(401, 'Unauthorized', messages.UNAUTHORIZED)
  @ApiErrorResponseWrapped(403, 'Forbidden — admin only', messages.ACCESS_DENIED)
  @ApiErrorResponseWrapped(404, 'User not found', messages.USER_NOT_FOUND)
  getUser(@Param('id') id: string) {
    return firstValueFrom(this.userService.send(MessagePatterns.USER_GET_ONE, id));
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a user by ID (admin only)' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponseWrapped(UserDataDto)
  @ApiErrorResponseWrapped(400, 'Duplicate email', messages.EMAIL_ALREADY_EXISTS)
  @ApiErrorResponseWrapped(401, 'Unauthorized', messages.UNAUTHORIZED)
  @ApiErrorResponseWrapped(403, 'Forbidden — admin only', messages.ACCESS_DENIED)
  @ApiErrorResponseWrapped(404, 'User not found', messages.USER_NOT_FOUND)
  updateUser(
    @Param('id') id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return firstValueFrom(
      this.userService.send(MessagePatterns.USER_UPDATE, {
        id,
        updateUserDto,
      }),
    );
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Soft-delete a user by ID (admin only)' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiOkMessageOnly(messages.USER_DELETED)
  @ApiErrorResponseWrapped(401, 'Unauthorized', messages.UNAUTHORIZED)
  @ApiErrorResponseWrapped(403, 'Forbidden — admin only', messages.ACCESS_DENIED)
  @ApiErrorResponseWrapped(404, 'User not found', messages.USER_NOT_FOUND)
  deleteUser(@Param('id') id: string) {
    return firstValueFrom(this.userService.send(MessagePatterns.USER_DELETE, id));
  }
}
