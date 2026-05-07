import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  LoginDto,
  messages,
  MessagePatterns,
  RegisterDto,
  ServiceTokens,
} from '@nestjs/shared-lib';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserPayload } from './interfaces/user-payload.interface';
import { LoginResponse } from './interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ServiceTokens.USER_SERVICE)
    private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserPayload | null> {
    const user = await lastValueFrom(
      this.userClient.send<UserPayload>(MessagePatterns.USER_VALIDATE_CREDENTIALS, email),
    );
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch ? user : null;
  }

  async register(registerDto: RegisterDto): Promise<UserPayload | undefined> {
    try {
      const user = await lastValueFrom(
        this.userClient.send<UserPayload>(MessagePatterns.USER_CREATE, registerDto),
      );

      return user;
    } catch (error: unknown) {
      if (error instanceof RpcException) {
        throw error;
      }
      if (error && typeof error === 'object' && 'message' in error && 'statusCode' in error) {
        throw new RpcException({
          statusCode: error.statusCode,
          message: error.message,
        });
      }
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: messages.INVALID_CREDENTIALS,
      });
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      message: messages.USER_LOGGED_IN,
      data: {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    };
  }
}
