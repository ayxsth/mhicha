import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CreateServiceDto } from './dto/create-service.dto';

import { ServiceModel } from './model/service.model';

@Injectable()
export class ServiceService {
  private logger: Logger;

  constructor(private readonly serviceModel: ServiceModel) {
    this.logger = new Logger(ServiceService.name);
  }

  async create(service: CreateServiceDto, userId: number) {
    this.logger.log(`Creating a service for with userId ${userId}`);

    const [id] = await this.serviceModel.create({ ...service, userId });

    return this.findOrFail(id);
  }

  findAll() {
    this.logger.log('Finding all services');

    return this.serviceModel.findAll();
  }

  async findOrFail(id: number) {
    this.logger.log(`Finding a service with id ${id}`);

    const service = await this.serviceModel.find(id);

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }
}
