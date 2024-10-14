import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'core',
        protoPath: join(__dirname, '../src/global_4_core/protos/core.proto'),
        url: 'localhost:5001',
      },
    },
  );
  await app.listen();
}
bootstrap();
