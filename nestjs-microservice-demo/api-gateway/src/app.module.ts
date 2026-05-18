import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceTokens } from '@nestjs/shared-lib';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthController } from './controllers/auth.controller';
import { ProductsController } from './controllers/products.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: ServiceTokens.AUTH_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_SERVICE_HOST', '127.0.0.1'),
            port: configService.get<number>('AUTH_SERVICE_PORT', 4001),
          },
        }),
      },
      {
        name: ServiceTokens.USER_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('USER_SERVICE_HOST', '127.0.0.1'),
            port: configService.get<number>('USER_SERVICE_PORT', 4002),
          },
        }),
      },
      {
        name: ServiceTokens.PRODUCT_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('PRODUCT_SERVICE_HOST', '127.0.0.1'),
            port: configService.get<number>('PRODUCT_SERVICE_PORT', 4003),
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController, UsersController, ProductsController],
  providers: [RolesGuard],
})
export class AppModule {}
