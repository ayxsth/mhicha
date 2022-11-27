import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { EmailService } from './email.service';

import { mailerFactory } from './email.factory';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule, MailerModule.forRootAsync(mailerFactory)],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
