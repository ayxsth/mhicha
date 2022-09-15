import KnexInitiator, { Knex } from 'knex';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@/module/config/config.service';

import { KnexConfig } from './interfaces/knex.interface';

@Injectable()
export class KnexService {
  private _knexConnection: Knex;
  private _knexOptions: KnexConfig;

  constructor(private readonly configService: ConfigService) {
    this._knexOptions = this.configService.getKnexConfig();
  }

  getKnex() {
    if (!this._knexConnection) {
      this._knexConnection = KnexInitiator(this._knexOptions);
    }

    return this._knexConnection;
  }
}
