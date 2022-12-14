import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { snakeCase } from 'change-case';
import camelcaseKeys from 'camelcase-keys';

import { AuthConfig } from '@/module/auth/interface/auth.interface';
import { KnexConfig } from '@/module/knex/interfaces/knex.interface';

import { AppConfig, DatabaseConfig, JwtConfig, MailerConfig } from './interfaces/config.interface';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get<T>(key: string) {
    return this.configService.get<T>(key);
  }

  getAppConfig() {
    return this.get<AppConfig>('app');
  }

  getDatabaseConfig() {
    return this.get<DatabaseConfig>('database');
  }

  getJwtConfig() {
    return this.get<JwtConfig>('jwt');
  }

  getEmailConfig() {
    return this.get<MailerConfig>('mailer');
  }

  getMailerConfig() {
    const mailerConfig = this.getEmailConfig();

    return {
      transport: {
        host: mailerConfig.host,
        service: mailerConfig.service,
        auth: {
          user: mailerConfig.auth.user,
          pass: mailerConfig.auth.pass
        }
      }
    };
  }

  getAuthConfig(): AuthConfig {
    const jwtConfig = this.getJwtConfig();

    return {
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn
      }
    };
  }

  getKnexConfig(): KnexConfig {
    const databaseConfig = this.getDatabaseConfig();

    return {
      client: databaseConfig.client,
      connection: {
        database: databaseConfig.name,
        host: databaseConfig.host,
        password: databaseConfig.password,
        port: databaseConfig.port,
        user: databaseConfig.user,
        timezone: databaseConfig.timezone,
        typeCast: (field, next) => {
          if (field.type === 'DATE') {
            return field.string();
          }

          return next();
        }
      },
      wrapIdentifier: (value: string, origImpl: any) => {
        if (value === '*') {
          return origImpl(value);
        }

        return origImpl(snakeCase(value));
      },
      postProcessResponse: (result) => {
        //unsure about it's requirement

        // if (!Array.isArray(result)) {
        //   return result;
        // }

        // if (result.length === 0 || !result[0] || typeof result[0] !== 'object') {
        //   return result;
        // }

        return camelcaseKeys(result, { deep: true });
      }
    };
  }
}
