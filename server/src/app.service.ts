import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppDetails() {
    return {
      name: process.env.APP_NAME,
      version: process.env.APP_VERSION
    };
  }
}
