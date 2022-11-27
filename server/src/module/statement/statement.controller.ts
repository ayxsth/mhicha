import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';

import { StatementService } from './statement.service';

import { JWT } from '@/common/constants/guard.constant';

import { AuthRequest } from '@/common/interface/route.interface';

@UseGuards(AuthGuard(JWT))
@Controller('statements')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Get()
  async findAll(@Req() req: AuthRequest) {
    const data = await this.statementService.findAll(req.user.id);

    return { data };
  }

  @Get('/:id')
  async find(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    const data = await this.statementService.findOrFail(req.user.id, id);

    return { data };
  }
}
