import { Module } from '@nestjs/common';
import { AdminauthController } from './adminauth.controller';
import { AdminauthService } from './adminauth.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AdminauthController],
  providers: [AdminauthService],
})
export class AdminauthModule {}
