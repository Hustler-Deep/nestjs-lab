import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiErrorResponseWrapped,
  ApiOkResponseWrapped,
  LoginDataDto,
  LoginDto,
  MessagePatterns,
  messages,
  RegisterDataDto,
  RegisterDto,
  ServiceTokens,
} from '@nestjs/shared-lib';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ServiceTokens.AUTH_SERVICE)
    private readonly authService: ClientProxy,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponseWrapped(RegisterDataDto)
  @ApiErrorResponseWrapped(
    400,
    'Validation error or duplicate email',
    messages.EMAIL_ALREADY_EXISTS,
  )
  register(@Body() body: RegisterDto) {
    return firstValueFrom(this.authService.send(MessagePatterns.AUTH_REGISTER, body));
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and receive a JWT access token' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponseWrapped(LoginDataDto)
  @ApiErrorResponseWrapped(400, 'Validation error', 'Password is required.')
  @ApiErrorResponseWrapped(401, 'Invalid credentials', messages.INVALID_CREDENTIALS)
  login(@Body() body: LoginDto) {
    return firstValueFrom(this.authService.send(MessagePatterns.AUTH_LOGIN, body));
  }
}
