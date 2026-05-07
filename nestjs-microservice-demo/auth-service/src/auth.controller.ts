import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto, MessagePatterns, RegisterDto } from '@nestjs/shared-lib';
import { AuthService } from './auth.service';
import { LoginResponse } from './interfaces/auth-response.interface';
import { UserPayload } from './interfaces/user-payload.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(MessagePatterns.AUTH_REGISTER)
  async register(@Payload() registerDto: RegisterDto): Promise<UserPayload | undefined> {
    return await this.authService.register(registerDto);
  }

  @MessagePattern(MessagePatterns.AUTH_LOGIN)
  async login(@Payload() loginDto: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(loginDto);
  }
}
