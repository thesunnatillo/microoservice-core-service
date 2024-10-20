import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'core',
        protoPath: join(__dirname, '../src/global_4_core/protos/core.proto'),
        url: process.env.URL,
      },
    },
  );
  await app.listen();
}
bootstrap();
