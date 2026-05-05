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
import { firstValueFrom } from 'rxjs';
import {
  CreateProductDto,
  CreateUserDto,
  CustomRequest,
  LoginDto,
  RegisterDto,
  UpdateProductDto,
  UpdateUserDto,
} from '@nestjs/shared-lib';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { Roles } from './common/decoraters/roles.decorator';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy,
  ) {}

  // ---------------- AUTH ----------------
  @Post('auth/register')
  register(@Body() body: RegisterDto) {
    return firstValueFrom(this.authService.send({ cmd: 'register' }, body));
  }

  @Post('auth/login')
  login(@Body() body: LoginDto) {
    return firstValueFrom(this.authService.send({ cmd: 'login' }, body));
  }

  // ---------------- USER ----------------
  @Post('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createUser(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<Record<string, unknown>> {
    const result = firstValueFrom(
      this.userService.send<Record<string, unknown>, CreateUserDto>(
        { cmd: 'create_user' },
        createUserDto,
      ),
    );

    return result;
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  getUsers() {
    return firstValueFrom(this.userService.send({ cmd: 'get_users' }, {}));
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getUser(@Param('id') id: string) {
    return firstValueFrom(this.userService.send({ cmd: 'get_user' }, id));
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
      this.userService.send({ cmd: 'update_user' }, { id, updateUserDto }),
    );
  }

  @Delete('users/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteUser(@Param('id') id: string) {
    return firstValueFrom(this.userService.send({ cmd: 'delete_user' }, id));
  }

  // ---------------- PRODUCTS ----------------
  @Post('products')
  @UseGuards(JwtAuthGuard)
  createProduct(@Body() dto: CreateProductDto, @Req() req: CustomRequest) {
    const user = req.user;
    return firstValueFrom(
      this.productService.send(
        { cmd: 'create_product' },
        { dto, userId: user.id },
      ),
    );
  }

  @Get('products')
  @UseGuards(JwtAuthGuard)
  getProducts(@Req() req: CustomRequest) {
    const user = req.user;
    return firstValueFrom(
      this.productService.send(
        { cmd: 'get_products' },
        { id: user.id, role: user.role },
      ),
    );
  }

  @Get('products/:id')
  @UseGuards(JwtAuthGuard)
  getProduct(@Param('id') id: string) {
    return firstValueFrom(
      this.productService.send({ cmd: 'get_product' }, Number(id)),
    );
  }

  @Patch('products/:id')
  @UseGuards(JwtAuthGuard)
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return firstValueFrom(
      this.productService.send(
        { cmd: 'update_product' },
        { id: Number(id), dto },
      ),
    );
  }

  @Delete('products/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteProduct(@Param('id') id: string) {
    return firstValueFrom(
      this.productService.send({ cmd: 'delete_product' }, Number(id)),
    );
  }
}
