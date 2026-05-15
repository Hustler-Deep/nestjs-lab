import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiErrorResponseWrapped, ApiOkResponseWrapped } from 'src/common/swagger/api-response.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto, RegisterResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponseWrapped(RegisterResponseDto)
  @ApiErrorResponseWrapped(HttpStatus.BAD_REQUEST, 'Validation error', 'Passwords do not match')
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
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login and obtain a JWT access token' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponseWrapped(LoginResponseDto)
  @ApiErrorResponseWrapped(HttpStatus.BAD_REQUEST, 'Validation error', 'Invalid input data')
  @ApiErrorResponseWrapped(
    HttpStatus.UNAUTHORIZED,
    'Invalid credentials',
    'Invalid email or password',
  )
  @ApiErrorResponseWrapped(
    HttpStatus.INTERNAL_SERVER_ERROR,
    'Unexpected server error',
    'Internal server error',
  )
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
