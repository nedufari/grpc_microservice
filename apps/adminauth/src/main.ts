import { NestFactory } from '@nestjs/core';
import { AdminauthModule } from './adminauth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ADMINAUTH_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AdminauthModule ,{
      transport :Transport.GRPC,
      options:{
        //specify the prototype
        protoPath: join(__dirname,'../adminauth.proto'),
        package: ADMINAUTH_PACKAGE_NAME

      }
    }
  )
  await app.listen()
}
bootstrap();
