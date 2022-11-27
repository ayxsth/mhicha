import { ConfigModule } from '@/module/config/config.module';

import { ConfigService } from '@/module/config/config.service';

export const mailerFactory = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => configService.getMailerConfig()
};
