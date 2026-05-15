import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateProductDto,
  CreateUserDto,
  CustomRequest,
  LoginDto,
  MessagePatterns,
  RegisterDto,
  Roles,
  ServiceTokens,
  UpdateProductDto,
  UpdateUserDto,
} from '@nestjs/shared-lib';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Controller()
export class AppController {
  constructor(
    @Inject(ServiceTokens.AUTH_SERVICE)
    private readonly authService: ClientProxy,
    @Inject(ServiceTokens.USER_SERVICE)
    private readonly userService: ClientProxy,
    @Inject(ServiceTokens.PRODUCT_SERVICE)
    private readonly productService: ClientProxy,
  ) {}

  // ---------------- AUTH ----------------
  @Post('auth/register')
  register(@Body() body: RegisterDto) {
    return firstValueFrom(this.authService.send(MessagePatterns.AUTH_REGISTER, body));
  }

  @Post('auth/login')
  login(@Body() body: LoginDto) {
    return firstValueFrom(this.authService.send(MessagePatterns.AUTH_LOGIN, body));
  }

  // ---------------- USER ----------------
  @Post('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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

  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getUsers() {
    return firstValueFrom(this.userService.send(MessagePatterns.USER_GET_ALL, {}));
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getUser(@Param('id') id: string) {
    return firstValueFrom(this.userService.send(MessagePatterns.USER_GET_ONE, id));
  }

  @Patch('users/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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

  @Delete('users/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteUser(@Param('id') id: string) {
    return firstValueFrom(this.userService.send(MessagePatterns.USER_DELETE, id));
  }

  // ---------------- PRODUCTS ----------------
  @Post('products')
  @UseGuards(JwtAuthGuard)
  createProduct(@Body() dto: CreateProductDto, @Req() req: CustomRequest) {
    const user = req.user;
    return firstValueFrom(
      this.productService.send(MessagePatterns.PRODUCT_CREATE, {
        dto,
        userId: user.id,
      }),
    );
  }

  @Get('products')
  @UseGuards(JwtAuthGuard)
  getProducts(@Req() req: CustomRequest) {
    const user = req.user;
    return firstValueFrom(
      this.productService.send(MessagePatterns.PRODUCT_GET_ALL, {
        id: user.id,
        role: user.role,
      }),
    );
  }

  @Get('products/:id')
  @UseGuards(JwtAuthGuard)
  getProduct(@Param('id') id: string) {
    return firstValueFrom(this.productService.send(MessagePatterns.PRODUCT_GET_ONE, Number(id)));
  }

  @Patch('products/:id')
  @UseGuards(JwtAuthGuard)
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return firstValueFrom(
      this.productService.send(MessagePatterns.PRODUCT_UPDATE, {
        id: Number(id),
        dto,
      }),
    );
  }

  @Delete('products/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteProduct(@Param('id') id: string) {
    return firstValueFrom(this.productService.send(MessagePatterns.PRODUCT_DELETE, Number(id)));
  }
}
