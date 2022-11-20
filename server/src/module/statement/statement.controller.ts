import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';

import { StatementService } from './statement.service';

import { JWT } from '@/common/constants/guard.constant';

import { AuthRequest } from '@/common/interface/route.interface';

@Controller('statements')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}

  @Get()
  @UseGuards(AuthGuard(JWT))
  findAll(@Req() req: AuthRequest) {
    return this.statementService.findAll(req.user.id);
  }

  @Get('/:id')
  @UseGuards(AuthGuard(JWT))
  find(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.statementService.findOrFail(req.user.id, id);
  }
}
