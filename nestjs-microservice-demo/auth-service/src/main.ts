import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 4001 },
    },
  );
  await app.listen();
}

bootstrap().catch((err) => {
  console.error('Microservice failed to start:', err);
  process.exit(1);
});
