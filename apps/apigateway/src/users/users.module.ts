import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';
import { ADMINAUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport:Transport.GRPC,
        options:{
          package:ADMINAUTH_PACKAGE_NAME,
          protoPath: join(__dirname,'../adminauth.proto')
        }

        
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
