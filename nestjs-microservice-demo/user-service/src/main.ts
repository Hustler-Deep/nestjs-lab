import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.TCP_HOST ?? '127.0.0.1',
      port: parseInt(process.env.TCP_PORT ?? '4002', 10),
    },
  });
  await app.listen();
}

bootstrap().catch((err) => {
  console.error('User microservice failed to start:', err);
  process.exit(1);
});
