import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';

import { JWT } from '@/common/constants/guard.constant';

import { AuthRequest } from '@/common/interface/route.interface';

import { CreateServiceDto } from './dto/create-service.dto';

import { ServiceService } from './service.service';

@Controller('services')
@UsePipes(ValidationPipe)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(AuthGuard(JWT))
  @Post()
  async create(@Body() body: CreateServiceDto, @Req() req: AuthRequest) {
    const data = await this.serviceService.create(body, req.user.id);

    return {
      data
    };
  }

  @Get()
  async findAll() {
    const data = await this.serviceService.findAll();

    return { data };
  }

  @UseGuards(AuthGuard(JWT))
  @Get('/:id')
  async findOrFail(@Param('id', ParseIntPipe) id: number) {
    const data = await this.serviceService.findOrFail(id);

    return { data };
  }
}
