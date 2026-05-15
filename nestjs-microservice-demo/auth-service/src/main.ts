import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.TCP_HOST ?? '127.0.0.1',
      port: parseInt(process.env.TCP_PORT ?? '4001', 10),
    },
  });
  await app.listen();
}

bootstrap().catch((err) => {
  console.error('Auth microservice failed to start:', err);
  process.exit(1);
});
