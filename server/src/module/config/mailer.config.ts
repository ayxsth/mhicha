import { registerAs } from '@nestjs/config';

import { MailerConfig } from './interfaces/config.interface';

export default registerAs(
  'mailer',
  (): MailerConfig => ({
    host: process.env.MAILER_HOST || 'smtp.gmail.com',
    service: process.env.MAILER_SERVICE || 'gmail',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    }
  })
);
