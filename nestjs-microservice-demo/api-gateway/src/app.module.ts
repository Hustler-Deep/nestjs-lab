import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceTokens } from '@nestjs/shared-lib';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './common/guards/roles.guard';

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
  controllers: [AppController],
  providers: [RolesGuard],
})
export class AppModule {}
