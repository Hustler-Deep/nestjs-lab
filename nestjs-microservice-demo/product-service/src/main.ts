import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.TCP_HOST ?? '127.0.0.1',
      port: parseInt(process.env.TCP_PORT ?? '4003', 10),
    },
  });
  await app.listen();
}

bootstrap().catch((err) => {
  console.error('Product microservice failed to start:', err);
  process.exit(1);
});
