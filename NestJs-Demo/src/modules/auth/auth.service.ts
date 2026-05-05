import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { messages } from 'src/constants/messages.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch ? user : null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) throw new UnauthorizedException(messages.INVALID_CREDENTIALS);

    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }
}
