import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto, LoginDto, MessagePatterns } from '@nestjs/shared-lib';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(MessagePatterns.AUTH_REGISTER)
  register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern(MessagePatterns.AUTH_LOGIN)
  async login(@Payload() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
