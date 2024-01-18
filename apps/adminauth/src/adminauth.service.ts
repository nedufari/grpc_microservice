import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminauthService {
  getHello(): string {
    return 'Hello World!';
  }
}
