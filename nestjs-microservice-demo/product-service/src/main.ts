import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductModule,
    {
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4003 },
    },
  );
  await app.listen();
}

bootstrap().catch((err) => {
  console.error('Microservice failed to start:', err);
  process.exit(1);
});
